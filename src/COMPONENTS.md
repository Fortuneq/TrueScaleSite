# TrueScale Website Components Guide

## Component Overview

This document describes each component in the modular TrueScale website architecture.

## HTML Components

### 1. Head (`components/head.html`)
**Purpose:** Document head with meta tags, fonts, and external resources

**Contains:**
- SEO meta tags (title, og:title, twitter:title)
- Favicon and apple-touch-icon
- CSS stylesheet links
- Google Fonts preconnect and loading
- Webflow JavaScript detection
- Animation visibility CSS rules

**Usage:** Include in `<head>` section of main HTML

---

### 2. Navigation (`components/navigation.html`)
**Purpose:** Main site navigation with smooth scrolling

**Features:**
- Desktop navigation menu with 3 main sections
- Mobile hamburger menu with overlay
- Webflow animation attributes for entrance effects
- ARIA accessibility attributes

**Sections:**
- Как мы работаем (Process)
- Что мы делаем (Services)
- Проекты (Projects)

---

### 3. Hero Section (`components/hero-section.html`)
**Purpose:** Landing area with main title and scroll CTA

**Features:**
- Main headline with line breaks
- Animated text container (gradient effect)
- Scroll down button with arrow icon
- Webflow animation trigger attributes

**Key Elements:**
- `display-system` class for main heading
- `design-tools-animation-text` for gradient text
- Scroll behavior handled by navigation.js

---

### 4. Value Proposition (`components/value-proposition.html`)
**Purpose:** Company mission and value statement

**Features:**
- Centered text block with company value proposition
- Animation wrapper for text reveal effects
- Responsive typography

---

### 5. Process Section (`components/process-section.html`)
**Purpose:** 6-step work methodology in accordion format

**Steps:**
1. Диагностика и исследование
2. Проектирование решений  
3. Архитектура и дизайн процессов
4. Разработка и интеграция
5. Оптимизация и рост
6. Поддержка и развитие

**Features:**
- Expandable accordion drawers
- Arrow indicators for open/closed states
- Webflow interaction system for animations

---

### 6. Services Section (`components/services-section.html`) 
**Purpose:** Service offerings with pricing information

**Services:**
- **001:** Стратегия и запуск AI-систем (₽1,050,000/месяц)
- **002:** Внедрение и масштабирование AI-решений (₽570,000/месяц)

**Features:**
- Card-based layout
- Pricing display with monthly/weekly rates
- Service descriptions and target audiences

---

### 7. Case Studies Section (`components/case-studies-section.html`)
**Purpose:** Portfolio projects with videos and results

**Projects:**
- **Logistics:** AI system reducing planning costs 20%
- **Lead Generation:** 40% increase in qualified leads
- **E-commerce Analytics:** 3x ROI in 1 month
- **Quest City:** 70% increase in ticket sales

**Features:**
- Desktop: Video iframes with text overlays
- Mobile: Separate responsive layout
- Hover effects and expandable descriptions

---

### 8. Footer Section (`components/footer-section.html`)
**Purpose:** Company information and site navigation

**Contains:**
- Company logo/name
- Footer navigation links (mirror main nav)
- Contact information (location, year, Telegram)
- Legal links (User Agreement, Privacy Policy)

---

### 9. Contact Form (`components/contact-form.html`)
**Purpose:** Modal form for collaboration requests

**Fields:**
- Name (text, required)
- Company (text, required) 
- Service needed (text, required)
- Phone (tel, required)
- Email (email, required)

**Features:**
- Modal overlay with back button
- Form validation
- Success/error message display
- Animation blocks for transitions
- Integrates with Python backend via contact-form.js

---

### 10. CTA Button (`components/cta-button.html`)
**Purpose:** Fixed call-to-action button

**Features:**
- Fixed positioning
- Triggers contact form modal
- Webflow animation ID for interactions
- Multi-line text layout

---

### 11. Background Animation (`components/background-animation.html`)
**Purpose:** 3D animated background canvas

**Features:**
- Three.js canvas container
- Fixed positioning behind content
- Responsive sizing
- Integration with three-animation.js

---

### 12. Cursor Animation (`components/cursor-animation.html`)
**Purpose:** Custom animated cursor

**Features:**
- Custom cursor that follows mouse
- CSS transforms for positioning
- Mix-blend-mode for visual effects

## CSS Modules

### 1. Main CSS (`css/main.css`)
**Purpose:** Core Webflow styles (preserved from original)
- Typography system
- Layout grids
- Component base styles
- Responsive breakpoints

### 2. Custom Colors (`css/custom-colors.css`) 
**Purpose:** Color overrides and brand colors
- Custom CSS variables
- Brand color definitions

### 3. Animations (`css/animations.css`)
**Purpose:** Animation visibility states and transitions
- Webflow animation initial states
- Media query specific visibility rules
- Overflow control

### 4. Components (`css/components.css`)
**Purpose:** Component-specific styling
- Cursor animation styles
- Gradient text effects
- Form animation blocks
- Accessibility overrides

## JavaScript Modules

### 1. API Blocker (`js/api-blocker.js`)
**Purpose:** Blocks external API calls while preserving Webflow

**Blocked Domains:**
- webflow.com
- formdata.webflow.com
- vimeo.com
- challenges.cloudflare.com

**Methods:**
- Overrides fetch(), XMLHttpRequest, $.ajax()
- Provides window.originalAjax for internal use

### 2. Navigation (`js/navigation.js`)
**Purpose:** Handles all navigation interactions

**Features:**
- Smooth scrolling to sections
- Contact form modal show/hide
- Footer navigation handling
- CTA button interactions

### 3. Contact Form (`js/contact-form.js`)
**Purpose:** Form submission to Python backend

**Features:**
- Form validation
- AJAX submission to `/api/submit-form`
- Success/error message handling
- Uses originalAjax to bypass API blocker

### 4. Three Animation (`js/three-animation.js`)
**Purpose:** 3D background animation system

**Features:**
- Three.js scene setup
- Custom shader loading from GitHub
- Scroll-responsive animation
- GSAP integration for smooth transitions

## Case Studies

### File Naming Convention
Original files have been renamed with semantic names:

| Original | New Name | Purpose |
|----------|----------|---------|
| 1034841462.html | logistics-service.html | Logistics AI case study |
| 1034841381.html | nikita-ben-ami.html | Artist portfolio case |
| 1034842051.html | v5-group.html | E-commerce analytics case |
| 1034841148.html | quest-city.html | Quest platform case |

Mobile versions have `-mobile` suffix.

## Usage Instructions

### For Development
1. Use `index-refactored.html` as the main file
2. Modify components in `components/` directory
3. Add component-specific styles to `css/components.css`
4. Update JavaScript modules in `js/` directory

### For Content Updates
- **Text content:** Edit components directly
- **Images:** Update paths in relevant component files
- **Styling:** Use CSS modules for targeted changes
- **Animations:** Modify Webflow data-w-id attributes

### For New Features
1. Create new component file if needed
2. Add styles to appropriate CSS module
3. Update JavaScript modules if interaction needed
4. Include component in main HTML file
5. Update this documentation

## Browser Support
- Modern browsers with ES6+ support
- WebGL support required for 3D animations
- Mobile responsive design for all device sizes