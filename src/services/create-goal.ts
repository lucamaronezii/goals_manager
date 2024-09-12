import { db } from "../db/index.ts";
import { goals } from "../db/schema.ts";

export interface CreateGoalRequest {
    title: string;
    desiredWeeklyFrequency: number;
}

export const createGoal = async (request: CreateGoalRequest) => {
    const result = await db.insert(goals).values({
        title: request.title,
        desiredWeeklyFrequency: request.desiredWeeklyFrequency
    }).returning()

    const goal = result[0]

    return { goal }
}