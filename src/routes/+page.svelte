<script>
  import { useChat } from '@ai-sdk/svelte';
  
  const { messages, input, handleSubmit, error } = useChat({
    api: '/api/chat'
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
