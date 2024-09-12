import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoal } from '../../services/create-goal.ts';

export const createGoalEndpoint: FastifyPluginAsyncZod = async (app, _opts) => {
    app.post('/goals', {
        schema: {
            body: z.object({
                title: z.string(),
                desiredWeeklyFrequency: z.number().int().min(1).max(7)
            })
        }
    }, async req => {
        const { desiredWeeklyFrequency, title } = req.body
    
        const response = await createGoal({
            title,
            desiredWeeklyFrequency
        })
    
        return response
    })
};
