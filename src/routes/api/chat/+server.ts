import { MastraClient } from "@mastra/client-js";

const AGENT_NAME = "weatherAgent";
const THREAD_ID = "42";  // Hardcoded thread ID
const RESOURCE_ID = "2"; // Hardcoded resource ID

const mastraClient = new MastraClient({
  baseUrl: "http://localhost:4111", // Default Mastra server port
});

export async function POST({ request }: any) {
  const { messages } = await request.json();

  const agent = mastraClient.getAgent(AGENT_NAME);
  const result = await agent.stream({
    messages: [messages.at(-1)],
    threadId: THREAD_ID,
    resourceId: RESOURCE_ID,
  });

  return result;
}
