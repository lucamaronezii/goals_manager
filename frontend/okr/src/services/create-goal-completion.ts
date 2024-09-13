
export const createGoalCompletion = async (goalId: string) => {
    const res = await fetch('http://localhost:3333/goal-completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            goalId,
        })
    })
    const data = await res.json()

    return data
}