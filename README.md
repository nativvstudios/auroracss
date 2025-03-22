# Aurora CSS Framework

![Aurora CSS Framework](https://img.shields.io/badge/Aurora-v1.0.0-4ecca3)
![License](https://img.shields.io/badge/license-MIT-blue)
![Sass](https://img.shields.io/badge/Sass-powered-ff69b4)

A lightweight, modern CSS framework focused on creating elegant, responsive interfaces with glass morphism effects, fluid animations, and dark/light mode support.

<p align="center">
  <img src="showcase.gif" alt="Aurora CSS Framework Preview" width="720">
</p>

<p align="center">
  <img src="screenshot.png" alt="Aurora CSS Framework Preview" width="720">
</p>


## ✨ Features

- **🌓 Dark & Light Themes** - Seamless theme switching with persistent user preferences
- **🔮 Glass Morphism** - Beautiful glass-like UI components with backdrop blur effects
- **📱 Responsive Grid** - Flexible 12-column grid system that works on all devices
- **💫 Animations** - Smooth animations for scroll reveals, typing effects, and more
- **🎨 Modern Aesthetics** - Clean, modern design language with subtle gradients and shadows
- **🧩 Modular Components** - Extensible component library that's easy to customize
- **🚀 Lightweight** - Minimal footprint with no dependencies
- **📦 Sass Architecture** - Modular Sass components for easy customization and extension

## 📦 Installation

### Option 1: Download compiled CSS/JS files

Download the latest compiled CSS and JavaScript files from the `dist` folder.

### Option 2: Install via npm

```bash
npm install aurora-css
```

### Option 3: Clone Repository for Development

```bash
git clone https://github.com/yourusername/aurora-css.git
cd aurora-css
npm install
npm run build
```

## 🚀 Quick Start

### Basic Usage with Compiled CSS

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Aurora Project</title>
  <link rel="stylesheet" href="path/to/aurora.min.css">
</head>
<body class="aurora-dark">
  <!-- Grid Lines Background -->
  <div class="aurora-grid-lines" id="gridLines"></div>
  
  <!-- Theme Toggle Button -->
  <div class="aurora-toggle-container">
    <button class="aurora-theme-toggle" id="themeToggle">🌓</button>
  </div>
  
  <!-- Your content here -->
  <div class="aurora-container">
    <div class="aurora-glass-card">
      <h1 class="aurora-title">Hello Aurora!</h1>
      <p class="aurora-subtitle">Your beautiful UI is ready to go.</p>
      <button class="aurora-btn aurora-btn-primary">Get Started</button>
    </div>
  </div>
  
  <!-- JavaScript -->
  <script src="path/to/aurora.min.js"></script>
  <script src="path/to/aurora-animationfix.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize all Aurora components
      Aurora.init();
    });
  </script>
</body>
</html>
```

### Usage with Sass

Import Aurora in your Sass project to customize variables and use only the components you need:

```scss
// Override default variables
$aurora-accent-color: #6a3de8;
$aurora-secondary-accent: #ff7a50;
$aurora-border-radius: 8px;

// Import Aurora components
@import "aurora/variables";
@import "aurora/mixins";
@import "aurora/reset";

// Import only the components you need
@import "aurora/grid";
@import "aurora/typography";
@import "aurora/buttons";
@import "aurora/cards";
// Add more components as needed

// Or import everything
// @import "aurora";
```

### Building with Gulp

If you've cloned the repository and want to customize the framework:

1. Edit Sass files in the `src/scss/` directory
2. Run the build process:

```bash
# Build once
gulp build

# Watch for changes during development
gulp dev
```

This will compile and minify the CSS and JavaScript files to the `dist` directory.

## 🧩 Components

Aurora includes a variety of UI components to help you build beautiful interfaces:

### Layout
- Container & Grid system
- Responsive columns
- Flexbox utilities

### Elements
- Typography system
- Buttons & button variants
- Input controls & forms
- Cards & glass cards

### Interactive Components
- Modals
- Tooltips
- Navbar with mobile navigation
- Theme switching

### Animations
- Scroll animations
- Parallax effects
- Typing animations
- Hover transitions

## 🎨 Theme Customization

### Using CSS Variables

You can override the CSS variables to adapt the framework to your brand:

```css
:root {
  /* Colors */
  --aurora-accent-color: #4ecca3;         /* Primary accent color */
  --aurora-secondary-accent: #ff4d5a;     /* Secondary accent color */
  --aurora-bg-color: #0f1923;             /* Background color (dark mode) */
  --aurora-card-color: rgba(25, 31, 40, 0.7); /* Card background (dark mode) */
  --aurora-text-primary: #ffffff;         /* Primary text color (dark mode) */
  --aurora-text-secondary: rgba(255, 255, 255, 0.7); /* Secondary text (dark mode) */
  
  /* Sizes */
  --aurora-border-radius: 4px;            /* Border radius for elements */
  --aurora-grid-gap: 1.5rem;              /* Gap between grid columns */
  
  /* Transitions */
  --aurora-transition-fast: 0.2s ease;    /* Fast transition speed */
  --aurora-transition-medium: 0.3s ease;  /* Medium transition speed */
  --aurora-transition-slow: 0.5s ease;    /* Slow transition speed */
}
```

### Using Sass Variables

For more control, you can customize Sass variables before importing Aurora components:

```scss
// Override variables in your project
$aurora-accent-color: #4ecca3;
$aurora-secondary-accent: #ff4d5a;
$aurora-border-radius: 6px;
$breakpoint-md: 800px; // Custom breakpoint

// Then import Aurora
@import "aurora/variables";
@import "aurora/mixins";
// Import other components...
```

## 📚 JavaScript Utilities

Aurora includes responsive JavaScript utilities to enhance functionality:

```javascript
// Initialize all Aurora components with custom options
Aurora.init({
  // Component Options
  themeToggle: {
    defaultTheme: 'dark'
  },
  scrollAnimations: {
    threshold: 0.2
  },
  tooltips: {
    delay: 200,
    touchEnabled: true // Enable tooltips on touch devices
  },
  parallax: {
    disableOnMobile: true // Disable parallax on mobile for better performance
  },
  mobileNav: {
    mobileBreakpoint: 768 // Set breakpoint for mobile navigation
  },
  adaptiveLayout: {
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  }
});

// Create a typing animation
Aurora.initTyping('elementId', [
  'First text to display',
  'Second text to display',
  'Third text to display'
], {
  typeSpeed: 80,
  eraseSpeed: 40,
  newTextDelay: 1500
});

// Or initialize components individually
Aurora.initMobileNav();
Aurora.initScrollAnimationsImproved();
Aurora.initAdaptiveLayout();
```

## 📱 Browser Support

Aurora is designed to work on all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers with enhanced touch support

## 📂 Directory Structure

```
aurora-css/
├── dist/                # Compiled and minified files
│   ├── css/
│   │   ├── aurora.css   # Compiled CSS
│   │   └── aurora.min.css  # Minified CSS
│   └── js/             
│       ├── aurora.js    # Main JavaScript
│       ├── aurora.min.js  # Minified JavaScript
│       └── aurora-animationfix.js  # Animation fixes
├── src/                 # Source files
│   ├── scss/            # Sass components
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   └── ... (other components)
│   └── js/              # JavaScript source
├── docs/                # Documentation
└── gulpfile.js          # Build tools
```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- Inspired by modern UI/UX trends and glass morphism effects
- Thanks to all contributors who helped make this framework better