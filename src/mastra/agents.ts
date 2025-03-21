import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { openai } from "@ai-sdk/openai";
import { createTool } from "@mastra/core";

export const readClipboard = createTool({
  id: "readClipboard",
  description: "Reads the last copied value on the device's clipboard.",
});

const memory = new Memory({
  options: {
    workingMemory: {
      enabled: true,
      use: "tool-call", // Required for toDataStream() compatibility
    },
  },
  embedder: openai.embedding("text-embedding-3-small"),
});

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      You are a helpful assistant
`,
  model: openai("gpt-4o-mini"),
  tools: { readClipboard },
  memory,
});
