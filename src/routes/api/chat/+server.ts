import { mastra } from "../../../mastra/index";

export async function POST({ request }: any) {
  const { messages } = await request.json();
  const myAgent = mastra.getAgent("weatherAgent");
  const stream = await myAgent.stream([messages.at(-1)], {
    threadId: "42",
    resourceId: "2",
    maxSteps: 5,
  });

  return stream.toDataStreamResponse();
}
