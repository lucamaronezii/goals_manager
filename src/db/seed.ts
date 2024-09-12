import dayjs from "dayjs"
import { client, db } from "./index.ts"
import { goalCompletions, goals } from "./schema.ts"

const seed = async () => {
    await db.delete(goalCompletions)
    await db.delete(goals)

    const result = await db.insert(goals).values([
        { title: 'Acordar às 06:00', desiredWeeklyFrequency: 5 },
        { title: 'Estudar Node.js', desiredWeeklyFrequency: 5 },
        { title: 'Comer laranja', desiredWeeklyFrequency: 5 },
    ]).returning()

    const startOfWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values([
        { goalId: result[0].id, createdAt: startOfWeek.toDate() },
        { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    ])
}

seed().finally(() => {
    client.end()
})
 