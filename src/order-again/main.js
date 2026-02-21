import { mount } from 'svelte';
import OrderAgain from './OrderAgain.svelte';

// Mount the component when DOM is ready
function initOrderAgain() {
  const target = document.getElementById('order-container');
  
  if (target) {
    // Get props from data attributes or global variable
    const props = {};
    
    // Try to get props from data-props attribute
    const propsData = target.dataset.props;
    if (propsData) {
      try {
        Object.assign(props, JSON.parse(propsData));
      } catch (e) {
        console.warn('Failed to parse props from data-props:', e);
      }
    }
    
    // Or get individual props from data attributes
    if (target.dataset.apiUrl) props.apiUrl = target.dataset.apiUrl;
    if (target.dataset.userEmail) props.userEmail = target.dataset.userEmail;
    if (target.dataset.buttonText) props.buttonText = target.dataset.buttonText;
    if (target.dataset.buttonClass) props.buttonClass = target.dataset.buttonClass;
    
    // Or get props from global variable
    if (window.orderAgainProps) {
      Object.assign(props, window.orderAgainProps);
    }
    
    mount(OrderAgain, { target, props });
  } else {
    console.warn('Order Again: No element found with id "order-container"');
  }
}

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOrderAgain);
} else {
  initOrderAgain();
}