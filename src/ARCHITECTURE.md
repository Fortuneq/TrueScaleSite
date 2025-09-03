# TrueScale Website Architecture Documentation

## Overview
This is a static website for TrueScale, an AI automation and digital solutions company. The site has been refactored from a single-file Webflow export into a modular, maintainable structure.

## File Structure

```
src/
├── index.html                 # Original monolithic version
├── index-refactored.html     # New modular version
├── components/               # HTML components (individual sections)
│   ├── head.html            # Meta tags, fonts, resources
│   ├── navigation.html      # Main navigation bar
│   ├── hero-section.html    # Landing area with title
│   ├── value-proposition.html # Company mission
│   ├── process-section.html  # 6-step methodology
│   ├── services-section.html # Service offerings
│   ├── case-studies-section.html # Portfolio projects
│   ├── footer-section.html   # Footer with links
│   ├── contact-form.html     # Contact modal
│   ├── cta-button.html      # Call-to-action button
│   ├── background-animation.html # 3D animation canvas
│   └── cursor-animation.html # Custom cursor
├── css/
│   ├── main.css             # Main Webflow styles (preserved)
│   ├── custom-colors.css    # Custom color overrides
│   ├── animations.css       # Animation visibility states
│   └── components.css       # Component-specific styles
├── js/
│   ├── api-blocker.js       # Blocks external API calls
│   ├── navigation.js        # Navigation interactions
│   ├── contact-form.js      # Form submission handling
│   ├── three-animation.js   # 3D background animation
│   ├── webflow.*.js         # Webflow functionality (preserved)
│   ├── three.min.js         # Three.js library
│   ├── gsap.min.js          # GSAP animation library
│   └── jquery-*.js          # jQuery library
├── case-studies/            # Renamed case study files
│   ├── logistics-service.html        # Logistics AI system
│   ├── logistics-service-mobile.html # Mobile version
│   ├── nikita-ben-ami.html          # Artist portfolio
│   ├── nikita-ben-ami-mobile.html   # Mobile version
│   ├── v5-group.html                # E-commerce analytics
│   ├── v5-group-mobile.html         # Mobile version
│   ├── quest-city.html              # Quest platform
│   └── quest-city-mobile.html       # Mobile version
└── images/                  # Image assets (unchanged)
```

## Key Components

### 1. Navigation System
**File:** `js/navigation.js`
- Smooth scrolling between sections
- Mobile menu handling
- Contact form modal triggering
- Footer navigation

### 2. Contact Form Integration
**Files:** `js/contact-form.js`, `backend.py`
- Form validation and submission
- Integration with Python Flask backend
- Telegram bot notifications
- Success/error handling

### 3. External API Blocking
**File:** `js/api-blocker.js`
- Intercepts fetch, XMLHttpRequest, jQuery AJAX
- Blocks calls to Webflow, Vimeo, CloudFlare APIs
- Preserves internal functionality
- Allows backend communication

### 4. 3D Animation System
**File:** `js/three-animation.js`
- Three.js icosahedron with custom shaders
- Scroll-responsive animation parameters
- GSAP-powered smooth transitions
- External shader loading from GitHub Gists

## Technical Implementation

### Backend Integration
The site integrates with a Python Flask backend for form submissions:

**Endpoint:** `POST /api/submit-form`
**Proxy:** nginx routes `/api/*` to `backend:5000`
**Integration:** Telegram bot sends notifications to chat

### Animation System
- **Library:** Three.js + GSAP
- **Geometry:** Icosahedron with 64 subdivisions
- **Shaders:** Custom vertex/fragment shaders from GitHub
- **Interaction:** Scroll-based uniform updates

### Responsive Design
- **Framework:** Webflow responsive grid
- **Breakpoints:** Desktop (992px+), Tablet (768-991px), Mobile (480-767px)
- **Components:** Mobile-specific versions for complex sections

## Development Guidelines

### Adding New Sections
1. Create component HTML file in `components/`
2. Add component-specific CSS to `css/components.css`
3. Include component in main `index-refactored.html`
4. Update navigation if needed

### Modifying Animations
- **Webflow animations:** Modify data-w-id attributes and CSS
- **3D animation:** Update uniforms in `three-animation.js`
- **Scroll effects:** Modify scroll event handlers

### Form Integration
- **Frontend:** Update `contact-form.js` for new fields
- **Backend:** Modify `backend.py` route handler
- **Telegram:** Update message formatting in backend

## Security Features
- External API calls blocked
- No sensitive data in frontend
- Telegram token secured in backend environment
- CORS properly configured

## Deployment
The site deploys using Docker Compose with:
- **nginx:** Static file serving + API proxy
- **backend:** Python Flask application
- **SSL:** Let's Encrypt integration

Use `docker-compose up --build -d` to deploy both services.