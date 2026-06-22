# ManPower Homepage - Quick Reference Guide

## 🎯 What Was Created

### Files Created:
1. **Configuration**
   - `tailwind.config.js` - Tailwind configuration with premium design tokens
   - Updated `vite.config.js` - Added @tailwindcss/vite plugin

2. **Design System**
   - `src/design-system.css` - Global CSS variables and utilities

3. **Components (New)**
   - `src/sections/HeroSectionNew.jsx` - Premium hero with GSAP
   - `src/sections/StatsAndServicesSection.jsx` - Stats counters + 6 services
   - `src/sections/IndustriesAndWhyChooseUs.jsx` - 8 industries + 6 reasons
   - `src/sections/ClientsAndTestimonials.jsx` - Client logos + testimonial carousel
   - `src/sections/JobsAndBlog.jsx` - Job listings + blog articles
   - `src/sections/CTASections.jsx` - 3 CTA sections (CV, Employer, Contact)
   - `src/components/layout/Navbar.jsx` - Premium sticky navbar
   - `src/components/layout/Footer.jsx` - Multi-column premium footer
   - `src/components/layout/MainLayout.jsx` - Layout wrapper

4. **Pages (Updated)**
   - `src/pages/Home/Home.jsx` - Main homepage orchestrating all sections
   - `src/App.jsx` - Updated with React Router setup
   - `src/main.jsx` - Updated with HelmetProvider

5. **Documentation**
   - `HOMEPAGE_DOCUMENTATION.md` - Complete documentation
   - `QUICK_REFERENCE.md` - This file

---

## 🚀 Running the Project

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Utility Classes Quick Reference

### Buttons
```jsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-accent">Accent Button</button>
<button className="btn btn-ghost">Ghost Button</button>
```

### Containers
```jsx
<div className="container">Max width centered</div>
<div className="container-fluid">Full width with padding</div>
<div className="container-tight">Smaller max width</div>
```

### Cards
```jsx
<div className="card">
  <div className="card-body">Content</div>
  <div className="card-footer">Actions</div>
</div>
```

### Sections
```jsx
<section className="section">Standard padding</section>
<section className="section-alt">With subtle gradient</section>
<section className="section-compact">Smaller padding</section>
<section className="section-inset">With borders</section>
```

### Glass Effects
```jsx
<div className="glass">Full glass effect</div>
<div className="glass-soft">Softer variant</div>
<div className="glass-strong">Stronger variant</div>
```

### Gradients
```jsx
<div className="bg-gradient-primary">Primary gradient</div>
<div className="bg-gradient-accent">Accent gradient</div>
<div className="gradient-overlay">Overlay effect</div>
```

### Shadows
```jsx
<div className="shadow-soft">Subtle</div>
<div className="shadow-card">Card elevation</div>
<div className="shadow-elevated">Strong elevation</div>
```

### Text Utilities
```jsx
<p className="text-muted">Muted text</p>
<p className="text-uppercase">Uppercase Text</p>
<span className="badge">Badge Label</span>
```

---

## 🎬 Animation Components

### Using Framer Motion
```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Using GSAP
```jsx
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
  }, containerRef)
  return () => ctx.revert()
}, [])
```

---

## 📁 Component Structure

### Hero Section
```
HeroSection
├── GSAP animations
├── Gradient text
├── Trust badges
└── Background orbs
```

### Stats Section
```
StatsSection
├── Animated counters (react-countup)
├── Staggered animations
└── Framer Motion reveal
```

### Services Section
```
ServicesSection
├── 6 service cards
├── Hover animations
└── Icon + description
```

### Industries Section
```
IndustriesSection
├── 8 industry cards
├── Scale on hover
└── Emoji icons
```

### Why Choose Us Section
```
WhyChooseUsSection
├── 6 reason cards
├── Left border accent
└── Hover animations
```

### Clients Showcase
```
ClientsSection
├── 6 client logos
├── Company size badges
└── Grid layout
```

### Testimonials Section
```
TestimonialsSection
├── Swiper carousel
├── 4 testimonials
├── 5-star ratings
└── Navigation + autoplay
```

### Latest Jobs Section
```
LatestJobsSection
├── 5 job cards
├── Job details (title, company, salary)
├── Skill tags
└── Swiper carousel
```

### Blog Section
```
BlogSection
├── 3 blog articles
├── Category + read time
└── Date + excerpt
```

### CV Registration CTA
```
CVRegistrationCTA
├── Gradient background
├── Compelling copy
└── Dual buttons
```

### Employer CTA
```
EmployerCTA
├── Two-column layout
├── Feature checklist
└── Floating animation cards
```

### Contact Form CTA
```
ContactCTA
├── Form fields (name, email, phone, message)
├── Form validation ready
└── Professional styling
```

---

## 🎨 Color System

### Primary Colors
```css
--color-primary: #071A3D (Navy Blue)
--color-secondary: #1D4ED8 (Bright Blue)
--color-accent: #D4AF37 (Gold)
```

### Neutral Colors
```css
--color-background: #F8FAFC
--color-surface: #FFFFFF
--color-text: #111827
--color-text-strong: #0F172A
--color-muted: #6B7280
--color-muted-soft: #94A3B8
```

### Utility Colors
```css
--color-border: rgba(15, 23, 42, 0.08)
--color-border-strong: rgba(15, 23, 42, 0.12)
```

---

## 🔧 Customization Examples

### Change Button Color
```jsx
// In design-system.css
.btn-primary {
  color: #FFFFFF;
  background: var(--color-primary);
}

// Or use Tailwind
<button className="btn bg-gradient-primary text-white">Button</button>
```

### Add New Service Card
```jsx
// In StatsAndServicesSection.jsx
const services = [
  // ... existing
  {
    icon: '🎯',
    title: 'New Service',
    description: 'Description here',
  },
]
```

### Create New Section
```jsx
// Create src/sections/NewSection.jsx
import { motion } from 'framer-motion'

export const NewSection = () => {
  return (
    <section className="section">
      <div className="container-fluid max-w-content">
        <h2 className="text-5xl font-bold">Title</h2>
      </div>
    </section>
  )
}

// Import in Home.jsx
import { NewSection } from '../sections/NewSection'

// Add to Home component
<NewSection />
```

---

## 📱 Mobile Responsive Tips

### Tailwind Responsive Classes
```jsx
// Mobile first
<div className="text-2xl md:text-4xl lg:text-6xl">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>

<div className="hidden md:block">
  Show on tablets and up
</div>
```

### Container Breakpoints
```jsx
<div className="container">
  {/* Auto-adjusts based on viewport */}
</div>
```

---

## ⚡ Performance Optimization

### Code Splitting (Future Enhancement)
```jsx
import { lazy, Suspense } from 'react'

const LatestJobs = lazy(() => import('../sections/JobsAndBlog'))

<Suspense fallback={<Loader />}>
  <LatestJobs />
</Suspense>
```

### Image Lazy Loading
```jsx
import { LazyLoadImage } from 'react-lazy-load-image-component'

<LazyLoadImage
  src="image.jpg"
  alt="Description"
/>
```

---

## 🔗 Navigation Links

Update in `Navbar.jsx` and `Footer.jsx`:
```jsx
const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Services', href: '/services' },
  // ... add more routes
]
```

---

## 🧪 Testing Checklist

- [ ] All sections load without errors
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Animations play smoothly
- [ ] Buttons are clickable
- [ ] Forms are interactive
- [ ] Navigation works
- [ ] Links navigate correctly
- [ ] Carousels (Swiper) work
- [ ] Counters animate
- [ ] Hover effects work

---

## 📚 Available Npm Packages

```json
{
  "react": "19.2.6",
  "react-router-dom": "7.16.0",
  "tailwindcss": "4.3.0",
  "@tailwindcss/vite": "4.3.0",
  "framer-motion": "12.40.0",
  "gsap": "3.15.0",
  "swiper": "12.2.0",
  "react-countup": "6.5.3",
  "react-hook-form": "7.77.0",
  "react-helmet-async": "3.0.0",
  "react-icons": "5.6.0",
  "zod": "4.4.3",
  "axios": "1.17.0"
}
```

---

## 🆘 Troubleshooting

### Styles not applying
- Clear browser cache
- Restart dev server
- Check `tailwind.config.js` content paths

### Animations not working
- Ensure Framer Motion and GSAP are imported
- Check browser dev console for errors
- Verify animation properties

### Form not responding
- Check React Hook Form setup
- Verify Zod validation schema
- Check onChange handlers

### Carousel not working
- Ensure Swiper modules are imported
- Check SwiperSlide children count
- Verify breakpoint settings

---

## 🎓 Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://gsap.com/docs)
- [Swiper Docs](https://swiperjs.com/react)
- [React Router Docs](https://reactrouter.com/)

---

**Last Updated:** June 2024
**Status:** Production Ready
