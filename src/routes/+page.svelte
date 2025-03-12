<script>
  import { useChat } from "@ai-sdk/svelte";

  const { messages, input, handleSubmit } = useChat({
    api: "api/chat",
    maxSteps: 5,
    onToolCall: async ({ toolCall }) => {
      console.log(toolCall);
      if (toolCall.toolName === `readClipboard`) {
        try {
          const clipboardText = await navigator.clipboard.readText();
          return clipboardText;
        } catch (error) {
          console.error("Failed to read clipboard:", error);
          return "Failed to read clipboard. Make sure you granted permission.";
        }
      }
    },
  });
</script>

<div class="chat-container">
  {#each $messages as message}
    <div class="message {message.role}">
      {message.content}
    </div>
  {/each}

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={$input} />
    <button type="submit">Send</button>
  </form>
</div>
