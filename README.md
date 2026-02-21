# Xano Components

Svelte 5 components compiled for CDN distribution via jsDelivr.

## 🚀 Usage

### Order Again Component

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/derricklovell/xano-components@main/order-again/order-again-component.css">
</head>
<body>
    <!-- Create a container element -->
    <div 
        id="order-container"
        data-api-url="YOUR_API_ENDPOINT"
        data-user-email="user@example.com"
        data-button-text="Order Again"
        data-button-class="order-again-btn"
    ></div>

    <!-- Load the component -->
    <script src="https://cdn.jsdelivr.net/gh/derricklovell/xano-components@main/order-again/order-again-component.js"></script>
</body>
</html>
```

### Props Configuration

You can configure the component in three ways:

1. **Data attributes** (recommended):
```html
<div 
    id="order-container"
    data-api-url="https://your-api.com/reorder"
    data-user-email="user@example.com"
    data-button-text="Reorder Now"
    data-button-class="btn btn-primary"
></div>
```

2. **JSON data attribute**:
```html
<div 
    id="order-container"
    data-props='{"apiUrl": "https://your-api.com/reorder", "userEmail": "user@example.com"}'
></div>
```

3. **Global variable**:
```html
<script>
    window.orderAgainProps = {
        apiUrl: 'https://your-api.com/reorder',
        userEmail: 'user@example.com',
        buttonText: 'Order Again',
        buttonClass: 'my-custom-btn'
    };
</script>
```

## 🛠 Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/derricklovell/xano-components.git
cd xano-components
npm install
```

### Building Components

```bash
npm run build
```

This builds all components in the `src/` directory and outputs them to root-level folders for CDN serving.

### Creating New Components

1. Create a new directory in `src/` (e.g., `src/new-component/`)
2. Add a Svelte component file (e.g., `NewComponent.svelte`)
3. Create a `main.js` entry point that mounts the component
4. Run `npm run build`

Example `main.js`:

```js
import { mount } from 'svelte';
import NewComponent from './NewComponent.svelte';

function initComponent() {
  const target = document.getElementById('new-component-container');
  if (target) {
    const props = JSON.parse(target.dataset.props || '{}');
    mount(NewComponent, { target, props });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponent);
} else {
  initComponent();
}
```

### File Structure

```
xano-components/
├── .github/
│   └── workflows/
│       └── build-components.yml    # Auto-builds on push
├── src/
│   └── order-again/
│       ├── OrderAgain.svelte       # Svelte 5 component
│       └── main.js                 # Entry point
├── order-again/                    # Built output (auto-generated)
│   ├── order-again-component.js    # IIFE bundle
│   └── order-again-component.css   # Extracted styles
├── package.json
├── vite.config.js
├── build.js
└── README.md
```

## 🔄 Automated Builds

GitHub Actions automatically builds components when changes are pushed to the `src/` directory:

1. Detects changes in `src/`
2. Runs `npm run build`
3. Commits the compiled output back to the `main` branch
4. jsDelivr CDN picks up the changes

## 📖 Component API

### Order Again Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | string | `''` | POST endpoint for reorder API |
| `userEmail` | string | `''` | User's email address |
| `buttonText` | string | `'Order Again'` | Button display text |
| `buttonClass` | string | `'order-again-btn'` | CSS classes for the button |

The component expects the API endpoint to:
- Accept POST requests
- Expect JSON payload: `{"email": "user@example.com"}`
- Return JSON response with optional `message` field

## 🎨 Styling

Each component includes its own CSS file. The styles are scoped using Svelte's CSS scoping to prevent conflicts. You can override styles by using more specific selectors or `!important`.

## 📝 License

MIT License