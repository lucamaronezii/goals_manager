import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoalEndpoint } from "./routes/create-goal.ts";
import { createCompletionEndpoint } from "./routes/create-completion.ts";
import { getPendingGoalsEndpoint } from "./routes/get-pending-goals.ts";
import { getWeekSummaryEndpoint } from "./routes/get-week-summary.ts";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifyCors, {
    origin: '*'
})

app.register(createGoalEndpoint)
app.register(createCompletionEndpoint)
app.register(getPendingGoalsEndpoint)
app.register(getWeekSummaryEndpoint)

app.listen({
    port: 3333
}).then(() => {
    console.log('Server is running.')
}).catch(err => {
    console.error(err)
})
