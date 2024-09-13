
export interface WeekSummary {
    completed: number;
    total: number;
    goalsPerDay: Goal[]
}

interface Goal {
    [date: string]: {
        id: string;
        title: string;
        completedAt: string;
    }[]
}

export const getSummary = async (): Promise<WeekSummary> => {
    const res = await fetch('http://localhost:3333/week-summary')
    const data = await res.json()

    return data[0]
}
