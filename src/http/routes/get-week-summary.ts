import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSummary } from '../../services/get-week-summary.ts';

export const getWeekSummaryEndpoint: FastifyPluginAsyncZod = async (app, _opts) => {
    app.get('/week-summary', async req => {
        const response = await getWeekSummary()
    
        return response
    })
};
