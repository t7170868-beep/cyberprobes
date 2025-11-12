# CyberProbes Logo Implementation Guide

## Overview
This document outlines the comprehensive implementation of the CyberProbes logo across all website sections for strong brand identity, following a modern, minimal, and tech-inspired aesthetic that fits the dark cyber-security theme.

## Logo Assets Created

### 1. **logo-full.svg** (`/public/logo-full.svg`)
- **Dimensions**: 200x60px
- **Usage**: Full branding with company name and tagline
- **Features**: 
  - Magnifying glass icon with lock symbol
  - Circuit pattern elements
  - Company name with gradient text
  - Tagline: "Digital Forensics & Incident Response"
- **Colors**: Cyber blue (#00E5FF), Purple (#A94DFF), Green (#00FFB3)

### 2. **logo-icon.svg** (`/public/logo-icon.svg`)
- **Dimensions**: 60x60px
- **Usage**: Navigation bar, header, favicon
- **Features**:
  - Lock icon centered in circular design
  - Circuit accent lines
  - Gradient border effects
  - Scanning effect elements

### 3. **logo-compact.svg** (`/public/logo-compact.svg`)
- **Dimensions**: 150x40px
- **Usage**: Footer, compact spaces
- **Features**:
  - Small icon + company name
  - Optimized for horizontal layouts
  - White/monochrome versions available

### 4. **favicon.svg** (`/public/favicon.svg`)
- **Dimensions**: 32x32px
- **Usage**: Browser tab icon
- **Features**:
  - Simplified lock icon design
  - High contrast for small sizes
  - Dark background with gradient accents

### 5. **logo-watermark.svg** (`/public/logo-watermark.svg`)
- **Dimensions**: 400x400px
- **Usage**: Background watermarks, hero sections, CTAs
- **Features**:
  - Large-scale design with 15% opacity
  - Circuit pattern background
  - Concentric circles with lock center
  - Subtle brand presence

---

## Implementation Details

### 1. Header / Navigation Bar
**Files Modified**: 
- `src/components/Navbar.tsx`
- `src/components/Header.tsx`

**Implementation**:
```tsx
<Link href="/" className="flex items-center space-x-2 magnetic-button group" style={{ marginLeft: '30px' }}>
  <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
    <Image
      src="/logo-icon.svg"
      alt="CyberProbes Logo"
      fill
      className="object-contain"
      priority
    />
  </div>
  <span className="font-orbitron text-xl md:text-2xl font-bold cyber-text group-hover:text-cyber-blue transition-colors">
    CyberProbes
  </span>
</Link>
```

**Specifications**:
- Logo size: 48x48px (w-12 h-12)
- Left margin: 30-40px
- Hover effect: 10% scale-up
- Text color: Gradient cyber-text with blue hover
- Responsive: Adjusts on mobile

---

### 2. Hero Section (Top Banner)
**File Modified**: `src/components/CyberHero.tsx`

**Implementation**:
```tsx
<div className="absolute top-10 left-10 md:top-20 md:left-20 z-0 opacity-15 pointer-events-none">
  <Image
    src="/logo-watermark.svg"
    alt=""
    width={400}
    height={400}
    className="object-contain"
    priority
  />
</div>
```

**Specifications**:
- Position: Top-left corner (absolute positioning)
- Size: 400x400px
- Opacity: 15-20%
- z-index: 0 (behind content)
- Non-interactive: `pointer-events-none`

---

### 3. About Page
**File Modified**: `src/app/about/page.tsx`

**Implementations**:

#### Hero Section Watermark:
```tsx
<div className="absolute top-10 right-10 opacity-10 pointer-events-none">
  <Image
    src="/logo-watermark.svg"
    alt=""
    width={300}
    height={300}
    className="object-contain"
  />
</div>
```

#### "Our Story" Section:
```tsx
<div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
  <div className="relative w-32 h-32">
    <Image
      src="/logo-icon.svg"
      alt="CyberProbes Logo"
      fill
      className="object-contain"
    />
  </div>
  <span className="font-orbitron text-5xl font-bold text-white cyber-glow">CyberProbes</span>
</div>
```

**Specifications**:
- Hero watermark opacity: 10%
- Story section logo: 128x128px
- Centered with gradient background
- Integrated, not floating

---

### 4. Services Page
**File Modified**: `src/app/services/page.tsx`

**Service Card Implementation**:
```tsx
<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-blue-600 service-card relative">
  <div className="absolute top-3 left-3 w-6 h-6 opacity-30">
    <Image
      src="/logo-icon.svg"
      alt=""
      fill
      className="object-contain"
    />
  </div>
  {/* Rest of card content */}
</div>
```

**Specifications**:
- Icon size: 24x24px (w-6 h-6)
- Position: Top-left corner (absolute)
- Opacity: 30%
- Uniform across all 6 service cards
- Maintains card hierarchy

---

### 5. Call-to-Action Sections
**Files Modified**: 
- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/about/page.tsx`

**Implementation**:
```tsx
<section className="bg-blue-900 text-white py-10 md:py-16 relative overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    <Image
      src="/logo-watermark.svg"
      alt=""
      width={400}
      height={400}
      className="object-contain"
    />
  </div>
  <div className="container mx-auto px-4 text-center relative z-10">
    {/* CTA content */}
  </div>
</section>
```

**Specifications**:
- Watermark size: 400x400px
- Opacity: 10-15%
- Centered positioning
- Subtle branded effect
- Content z-index: 10

---

### 6. Footer
**File Modified**: `src/components/Footer.tsx`

**Implementation**:
```tsx
<Link href="/" className="flex items-center space-x-2 mb-4 group">
  <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
    <Image
      src="/logo-compact.svg"
      alt="CyberProbes Logo"
      fill
      className="object-contain brightness-0 invert"
    />
  </div>
  <h3 className="font-orbitron text-xl font-bold text-white">CyberProbes</h3>
</Link>
```

**Specifications**:
- Icon size: 32x32px (w-8 h-8)
- Color: Monochrome white (brightness-0 invert)
- Position: Left side of footer
- Hover: 10% scale effect
- Consistent sizing on all pages

---

### 7. Browser Favicon
**File Modified**: `src/app/layout.tsx`

**Implementation**:
```tsx
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/logo-icon.svg" />
  {/* Other head elements */}
</head>
```

**Specifications**:
- Format: SVG (scalable)
- Size: 32x32px
- Fallback: PNG versions can be added
- Apple touch icon: Uses logo-icon.svg

---

## Design Principles

### Color Palette
- **Cyber Blue**: `#00E5FF` - Primary accent
- **Neon Purple**: `#A94DFF` - Secondary accent
- **Neon Green**: `#00FFB3` - Tertiary accent
- **Dark Background**: `#0A0E27` - Base color
- **White**: `#FFFFFF` - Text/contrast

### Typography
- **Logo Text**: Orbitron (bold, futuristic)
- **Body Text**: Rajdhani / Inter
- **Letter Spacing**: 1-2px for tech feel

### Spacing & Margins
- Header logo left margin: 30-40px
- Icon padding in cards: 12px (top-left)
- Watermark margins: 40px+ from edges
- Footer logo: Left-aligned with content

### Opacity Levels
- **Watermarks**: 10-20% (hero/CTA sections)
- **Card icons**: 30% (service cards)
- **Navigation**: 100% (full visibility)

### Hover Effects
- Scale transform: 1.1x on hover
- Color transitions: 300ms ease
- Smooth, magnetic feel

---

## Responsive Considerations

### Mobile (< 768px)
- Logo icon: 40x40px
- Text size: 18-20px
- Watermarks: 250x250px or hidden
- Footer icon: 24x24px

### Tablet (768px - 1024px)
- Logo icon: 48x48px
- Standard implementation
- Watermarks: 300x300px

### Desktop (> 1024px)
- Logo icon: 48-60px
- Full watermarks: 400x400px
- Maximum visual impact

---

## File Structure
```
public/
├── logo-full.svg          # Full logo with text and tagline
├── logo-icon.svg          # Icon-only version (60x60)
├── logo-compact.svg       # Compact logo for footer (150x40)
├── favicon.svg            # Browser favicon (32x32)
└── logo-watermark.svg     # Large watermark version (400x400)

src/
├── components/
│   ├── Navbar.tsx         # ✅ Logo implemented
│   ├── Header.tsx         # ✅ Logo implemented
│   ├── Footer.tsx         # ✅ Logo implemented
│   └── CyberHero.tsx      # ✅ Watermark implemented
├── app/
│   ├── layout.tsx         # ✅ Favicon implemented
│   ├── page.tsx           # ✅ CTA watermark
│   ├── about/
│   │   └── page.tsx       # ✅ Hero + Story + CTA
│   ├── services/
│   │   └── page.tsx       # ✅ Cards + CTA
│   └── ...
```

---

## Browser Compatibility
- ✅ Chrome/Edge (SVG support)
- ✅ Firefox (Full gradient support)
- ✅ Safari (WebKit optimized)
- ✅ Mobile browsers (iOS/Android)

---

## Performance Optimization
- SVG format: Scalable without quality loss
- Small file sizes: < 10KB each
- Priority loading: Hero/navigation logos
- Lazy loading: Background watermarks
- No external dependencies

---

## Accessibility
- Alt text for navigation logos
- Empty alt for decorative watermarks
- High contrast ratios maintained
- Scalable vector graphics (no pixelation)
- Focus states on interactive logos

---

## Future Enhancements
- [ ] Animated logo for loading states
- [ ] Dark/light mode logo variants
- [ ] Logo animation on scroll
- [ ] 3D depth effects
- [ ] Particle system integration

---

## Maintenance
- Logo files located in `/public/`
- All logos use CSS classes for consistency
- Easy color updates via Tailwind config
- Version control: Track logo changes in git
- Update all instances when rebranding

---

## Contact
For logo design inquiries or modifications:
- Email: info@cyberprobes.in
- Design Assets: Contact design team

---

**Last Updated**: November 5, 2025  
**Version**: 1.0  
**Designer**: CyberProbes Team

