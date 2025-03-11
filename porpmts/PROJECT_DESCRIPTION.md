# Hardik Srivastava Portfolio & Cybersecurity Hub

## Project Overview
This project is a dual-purpose website serving as both a personal portfolio for Hardik Srivastava, a Certified Ethical Hacker and Cybersecurity Innovator, and a comprehensive cybersecurity resource hub. The site showcases professional expertise, projects, and contact information while providing valuable cybersecurity resources, tools, and educational content.

## Core Features

1. **Personal Portfolio**
   - Professional profile and biography
   - Skills and certifications showcase
   - Project portfolio with detailed case studies
   - Interactive resume/CV
   - Contact information and social media links

2. **Cybersecurity Resource Hub**
   - Educational content and tutorials
   - Cyber Pulse Dashboard (threat intelligence visualization)
   - Tools and resources for cybersecurity professionals
   - Blog/articles on latest security trends
   - AR-enhanced security concept demonstrations

3. **Interactive Elements**
   - Gamified learning components
   - AR (Augmented Reality) features for visualizing security concepts
   - Voice-controlled navigation and search
   - Animated transitions and UI elements
   - Dark/light theme toggle with cybersecurity aesthetic

## Technical Stack

- **Frontend Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS with custom theming
- **Animations**: Framer Motion for smooth transitions and UI effects
- **3D Visualization**: Three.js for 3D elements and visualizations
- **CMS Integration**: Sanity for content management
- **Database**: Supabase for user data and dynamic content
- **Voice Interaction**: Web Speech API for voice commands
- **AR Features**: AR.js for augmented reality experiences
- **Smooth Scrolling**: react-scroll for section navigation
- **Monitoring**: Sentry for error tracking and performance monitoring
- **Data Visualization**: Chart.js and react-chartjs-2 for analytics displays

## Project Structure

```
/media/kaliluser/Acer/POrtfolio/try/
├── public/            # Static assets and resources
├── src/
│   ├── app/           # Next.js App Router pages and layouts
│   ├── components/    # Reusable UI components
│   │   ├── demo/      # Demo-specific components
│   │   ├── layout/    # Layout components (header, footer, etc.)
│   │   ├── sections/  # Page section components
│   │   └── ui/        # Base UI components
│   ├── docs/          # Documentation files
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and service integrations
│   ├── schemas/       # Sanity CMS schemas
│   ├── styles/        # Global styles and Tailwind configurations
│   ├── tests/         # Test files
│   └── types/         # TypeScript type definitions
├── .env               # Environment variables (not in repo)
├── next.config.js     # Next.js configuration
├── package.json       # Dependencies and scripts
├── postcss.config.js  # PostCSS configuration for Tailwind
└── tailwind.config.js # Tailwind CSS configuration
```

## Development Guidelines

1. **Code Quality**
   - Follow TypeScript best practices and avoid using `any` type
   - Maintain ESLint rules compliance
   - Write meaningful comments for complex logic
   - Use proper error handling with Sentry integration

2. **Performance Optimization**
   - Optimize images using Next.js Image component
   - Implement code splitting and lazy loading
   - Minimize bundle size with proper imports
   - Use server-side rendering where appropriate

3. **Accessibility**
   - Ensure WCAG 2.1 AA compliance
   - Implement keyboard navigation
   - Add proper ARIA attributes
   - Test with screen readers

4. **Security**
   - Implement proper authentication with Supabase
   - Sanitize user inputs
   - Set up proper CSP headers
   - Regular dependency updates

## Current Development Status

The project is currently in active development with the following components implemented:

- Basic Next.js structure with App Router
- Theme provider with dark/light mode
- Layout components (header, footer)
- Sanity CMS integration for content management
- Sentry integration for error tracking
- Basic portfolio demo component
- Initial styling with Tailwind CSS

## Next Development Priorities

1. Complete the Cyber Pulse Dashboard
2. Implement AR features for security visualization
3. Add voice command functionality
4. Enhance animation and transition effects
5. Develop the gamified learning components
6. Optimize for mobile responsiveness
7. Implement comprehensive SEO strategy
