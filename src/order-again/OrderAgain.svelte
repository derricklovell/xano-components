<script>
  import { onMount } from 'svelte';
  
  let { 
    apiUrl = '',
    userEmail = '',
    buttonText = 'Order Again',
    buttonClass = 'order-again-btn'
  } = $props();

  let isLoading = $state(false);
  let message = $state('');

  async function handleOrderAgain() {
    if (!apiUrl || !userEmail) {
      message = 'Missing API URL or user email';
      return;
    }

    isLoading = true;
    message = '';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail })
      });

      if (response.ok) {
        const result = await response.json();
        message = result.message || 'Order placed successfully!';
      } else {
        message = 'Failed to place order. Please try again.';
      }
    } catch (error) {
      message = 'An error occurred. Please try again.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="order-again-container">
  <button 
    class={buttonClass}
    onclick={handleOrderAgain}
    disabled={isLoading}
  >
    {#if isLoading}
      Loading...
    {:else}
      {buttonText}
    {/if}
  </button>
  
  {#if message}
    <div class="order-again-message" class:error={message.includes('Failed') || message.includes('error')}>
      {message}
    </div>
  {/if}
</div>

<style>
  .order-again-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .order-again-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }

  .order-again-btn:hover:not(:disabled) {
    background: #0056b3;
  }

  .order-again-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .order-again-message {
    padding: 8px 16px;
    border-radius: 4px;
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .order-again-message.error {
    background: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
  }
</style>