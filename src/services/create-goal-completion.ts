import dayjs from "dayjs";
import { db } from "../db/index.ts";
import { goalCompletions, goals } from "../db/schema.ts";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

export interface CompleteGoalRequest {
    goalId: string;
}

export const createGoalCompletion = async (request: CompleteGoalRequest) => {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfWeek = dayjs().endOf('week').toDate()

    const goalCompletionCounts = db.$with('goal_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: count(goalCompletions.id).as('completionCount')
        })
            .from(goalCompletions)
            .where(and(
                gte(goalCompletions.createdAt, firstDayOfWeek),
                lte(goalCompletions.createdAt, lastDayOfWeek)
            ))
            .groupBy(goalCompletions.goalId)
    )

    const result = await db.with(goalCompletionCounts)
        .select({
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            completionCount: sql/*sql*/`
                COALESCE(${goalCompletionCounts.completionCount}, 0)
            `.mapWith(Number)
        })
        .from(goals)
        .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
        .where(eq(goals.id, request.goalId))
        .limit(1)

    const { completionCount, desiredWeeklyFrequency } = result[0]

    if (completionCount >= desiredWeeklyFrequency) {
        throw new Error('Goal already completed this week.')
    }

    const insertResult = await db.insert(goalCompletions).values({ goalId: request.goalId }).returning()

    const goalCompletion = insertResult[0]

    return {
        goalCompletion
    }
}
