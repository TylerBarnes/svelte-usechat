import { MastraClient } from "@mastra/client-js";
// import { weatherAgent } from "../../../mastra/agents";

const AGENT_NAME = "weatherAgent";
const THREAD_ID = "68"; // Hardcoded thread ID
const RESOURCE_ID = "2"; // Hardcoded resource ID

const mastraClient = new MastraClient({
  baseUrl: "http://localhost:4111", // Default Mastra server port
});

export async function POST({ request }: any) {
  const { messages } = await request.json();

  const agent = mastraClient.getAgent(AGENT_NAME);

  console.log(messages);
  const result = await agent.stream({
    messages: [messages.at(-1)],
    threadId: THREAD_ID,
    resourceId: RESOURCE_ID,
  });
  return result;
  // const result = await weatherAgent.stream([messages.at(-1)], {
  //   threadId: THREAD_ID,
  //   resourceId: RESOURCE_ID,
  //   maxSteps: 5,
  // });
  //
  // return result.toDataStreamResponse();
}
