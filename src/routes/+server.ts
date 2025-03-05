import { mastra } from "../mastra/index";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const myAgent = mastra.getAgent("weatherAgent");
  const stream = await myAgent.stream(messages, {
    threadId: "42",
    resourceId: "2",
    maxSteps: 5,
  });

  return stream.toDataStreamResponse();
}
