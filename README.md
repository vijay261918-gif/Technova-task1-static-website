# VIJAYARAJ V - Portfolio

A futuristic, glassmorphism-styled personal portfolio website built with React, TypeScript, and Tailwind CSS. Features animated cosmic background, terminal-style hero card, and smooth scroll interactions.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **GitHub Actions** for CI/CD to GitHub Pages

## Features

- 🎨 Glassmorphism design with cosmic animated background
- 📱 Fully responsive (mobile-first)
- ♿ Accessible (WCAG AA, reduced-motion support)
- 🚀 Optimized performance (lazy loading, minimal dependencies)
- 📄 Resume download integration
- 🌙 Dark theme with purple/cyan/teal accent colors
- ✨ Smooth scroll navigation with active section highlighting
- ⌨️ Terminal typing animation in hero section

## Sections

1. **Hero** - Name, title, summary, CTAs, animated terminal card
2. **About** - Professional intro, metadata cards, key strengths
3. **Experience** - Timeline of internships with tech stacks
4. **Projects** - Featured SIH project + 3 other projects
5. **Skills** - Grouped by category (languages, frontend, backend, etc.)
6. **Certifications** - 4 certifications + hackathon details
7. **GitHub** - Profile stats, language distribution, pinned repos
8. **Contact** - Info panel + mailto-based contact form
9. **Footer** - Social links, copyright

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup

1. **Update the base path** in `vite.config.ts`:
   ```typescript
   base: '/YOUR_REPO_NAME/',
   ```

2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"

3. **Push to main branch** - The workflow will automatically build and deploy

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting platform
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (GlassCard, Button, SkillChip)
│   ├── Navigation.tsx   # Fixed glass navbar with mobile menu
│   ├── Hero.tsx         # Hero section with terminal card
│   ├── About.tsx        # About section
│   ├── Experience.tsx   # Experience timeline
│   ├── Projects.tsx     # Projects showcase
│   ├── Skills.tsx       # Skills grouped by category
│   ├── Certifications.tsx # Certifications & hackathons
│   ├── GitHubActivity.tsx # GitHub stats & repos
│   ├── Contact.tsx      # Contact form & info
│   └── Footer.tsx       # Footer with social links
├── data/
│   └── portfolioData.ts # Single source of truth from resume
├── hooks/
│   └── useScrollSpy.ts  # Custom hooks for scroll/intersection
├── styles/
│   └── globals.css      # Design tokens, glassmorphism, animations
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Customization

### Update Personal Information

Edit `src/data/portfolioData.ts` with your resume data.

### Change Colors

Modify the color palette in `tailwind.config.js` under `theme.extend.colors`.

### Update Repository Name for GitHub Pages

In `vite.config.ts`, replace `REPLACE_WITH_REPO_NAME` with your actual GitHub repository name:

```typescript
base: '/your-repo-name/',
```

## Resume Download

Place your resume PDF in `public/resume_vijaydocx.pdf` (or update the path in `portfolioData.ts`).

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Focus visible states
- Reduced motion support
- Sufficient color contrast
- Keyboard navigation

## Performance

- CSS-based animations (no heavy JS animations)
- Canvas background with requestAnimationFrame
- IntersectionObserver for scroll effects
- Lazy-loaded non-critical components
- Optimized bundle with Vite

## License

MIT License - Feel free to use as a template for your own portfolio.

## Contact

- **Email**: vijay261918@gmail.com
- **LinkedIn**: [linkedin.com/in/Vijayaraj-V](https://linkedin.com/in/Vijayaraj-V)
- **GitHub**: [github.com/vijay261918gif](https://github.com/vijay261918gif)