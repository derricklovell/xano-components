// Single demo order
const demoOrder = {
  id: 'ORD-4821',
  restaurant: "Joe's Pizza",
  rating: 4.9,
  title: 'Pepperoni Feast',
  emoji: '🍕',
  gradient: 'linear-gradient(135deg, #1a1208, #2d1f0a)',
  lastOrdered: 'Jan 19',
  orderCount: 3,
  items: [
    { name: 'Pepperoni Feast (Large)', price: 18.99, qty: 1, mods: 'Well done crust' },
    { name: 'Extra Cheese', price: 2.00, qty: 1, mods: '' }
  ],
  prefs: ['Extra cheese', 'Well done', 'No onions', 'Thin crust', 'Oregano on top'],
  activePrefs: ['Extra cheese', 'Well done', 'No onions'],
  deliveryFee: 2.49,
  total: 23.48
};

// Edit modal data
let editData = JSON.parse(JSON.stringify(demoOrder));
let currentOrderKey = 'pizza';
let isExpanded = false;

// Format price
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// Toggle dropdown
function toggleDropdown() {
  isExpanded = !isExpanded;
  renderOrder();
}

// Show toast
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Handle reorder
function handleReorder() {
  showToast(`📦 Reordering ${demoOrder.id}...`);
  
  setTimeout(() => {
    showToast(`✅ Order placed! Total: ${formatPrice(demoOrder.total)}`);
    
    window.dispatchEvent(new CustomEvent('orderAgain:reorder', {
      detail: { order: demoOrder }
    }));
  }, 1000);
}

// Open edit modal
function openEditModal() {
  document.getElementById('editModalTitle').textContent = 'Edit · ' + demoOrder.title;
  
  // Render items
  const list = document.getElementById('editItemsList');
  list.innerHTML = editData.items.map((item, i) => `
    <div class="edit-item">
      <div class="edit-item-left">
        <div class="ei-name">${item.name}</div>
        ${item.mods ? `<div class="ei-mods">${item.mods}</div>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:14px">
        <span style="font-size:13px;color:var(--muted)">$${item.price.toFixed(2)}</span>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
          <span class="qty-val" id="qty-${i}">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // Render prefs
  const prefsEl = document.getElementById('editPrefs');
  prefsEl.innerHTML = demoOrder.prefs.map(p => `
    <div class="modal-pref-chip ${demoOrder.activePrefs.includes(p) ? 'active' : ''}" onclick="togglePref(this, '${p}')">${p}</div>
  `).join('');

  document.getElementById('editModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Change quantity
function changeQty(idx, delta) {
  editData.items[idx].qty = Math.max(0, editData.items[idx].qty + delta);
  document.getElementById('qty-' + idx).textContent = editData.items[idx].qty;
  if (editData.items[idx].qty === 0) {
    document.getElementById('qty-' + idx).style.color = 'var(--accent)';
  } else {
    document.getElementById('qty-' + idx).style.color = '';
  }
}

// Toggle preference
function togglePref(el, pref) {
  el.classList.toggle('active');
  const idx = demoOrder.activePrefs.indexOf(pref);
  if (idx > -1) demoOrder.activePrefs.splice(idx, 1);
  else demoOrder.activePrefs.push(pref);
}

// Close modal
function closeEditModal(e) {
  if (e.target === document.getElementById('editModal')) closeEditModalDirect();
}
function closeEditModalDirect() {
  document.getElementById('editModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Render order
function renderOrder() {
  const container = document.getElementById('order-container');
  const expandedClass = isExpanded ? 'expanded' : '';

  container.innerHTML = `
    <div class="order-card ${expandedClass}" onclick="toggleDropdown()">
      <div class="oc-img">
        ${demoOrder.emoji}
        <div class="oc-img-overlay"></div>
        <div class="oc-img-labels">
          <div class="oc-restaurant">${demoOrder.restaurant}</div>
          <div class="oc-rating">⭐ ${demoOrder.rating}</div>
        </div>
      </div>
      
      <div class="oc-body">
        <div class="oc-title-row">
          <div class="oc-title">${demoOrder.title}</div>
          <div class="expand-arrow">▼</div>
        </div>
        
        <div class="oc-meta">
          <div class="oc-tag">🕐 Last ordered ${demoOrder.lastOrdered}</div>
          <div class="oc-tag">×${demoOrder.orderCount} orders</div>
        </div>
        
        <div class="oc-prefs">
          ${demoOrder.activePrefs.map(pref => `<div class="pref-chip">${pref}</div>`).join('')}
        </div>
      </div>
      
      <div class="oc-expand">
        <div class="oc-expand-inner">
          <div class="oc-order-summary">
            ${demoOrder.items.map(item => `
              <div class="oc-order-row">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
              </div>
            `).join('')}
            <div class="oc-order-row">
              <span>Delivery fee</span>
              <span>$${demoOrder.deliveryFee.toFixed(2)}</span>
            </div>
            <div class="oc-order-row total">
              <span>Total</span>
              <span>$${demoOrder.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="oc-cta">
            <div class="oc-total-big">$${demoOrder.total.toFixed(2)}</div>
            <button class="edit-btn" onclick="event.stopPropagation(); openEditModal()">✏️ Edit</button>
            <button class="order-again-btn" onclick="event.stopPropagation(); handleReorder()">🔁 Order Again</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderOrder();
  }, 500);
});

// Expose functions globally
window.toggleDropdown = toggleDropdown;
window.handleReorder = handleReorder;
window.openEditModal = openEditModal;
window.changeQty = changeQty;
window.togglePref = togglePref;
window.closeEditModal = closeEditModal;
window.closeEditModalDirect = closeEditModalDirect;