import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { createGoalCompletion } from '../../services/create-goal-completion.ts';

export const createCompletionEndpoint: FastifyPluginAsyncZod = async (app, _opts) => {
    app.post('/goal-completions', {
        schema: {
            body: z.object({
                goalId: z.string()
            })
        }
    }, async request => {
        const { goalId } = request.body
        
        const response = await createGoalCompletion({
            goalId
        })
    
        return response
    })
};
