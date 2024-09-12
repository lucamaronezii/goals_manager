import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from '../../services/get-week-pending-goals.ts';

export const getPendingGoalsEndpoint: FastifyPluginAsyncZod = async (app, _opts) => {
    app.get('/pending-goals', async req => {
        const response = await getWeekPendingGoals()
    
        return response.pendingGoals
    })
};
