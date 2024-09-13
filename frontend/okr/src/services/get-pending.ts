
interface PendingGoals {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
}

export const getPending = async (): Promise<PendingGoals[]> => {
    const res = await fetch('http://localhost:3333/pending-goals')
    const data = await res.json()

    return data
}
