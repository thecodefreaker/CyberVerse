## Prompt for AI Agent: Homepage and Portfolio Page Design and Development

**Objective**:  
You are tasked with designing and developing a scalable, innovative, and future-proof homepage and dedicated portfolio page for Hardik Srivastava, a Certified Ethical Hacker and Cybersecurity Innovator. The homepage should serve as an engaging overview of Hardik’s portfolio and the broader website, integrating dynamic content and showcasing his expertise in cybersecurity. The dedicated portfolio page should provide a detailed, interactive showcase of his projects. The design must be visually striking, highly functional, and packed with unique features to captivate visitors, including recruiters, peers, and learners.

**Context**:  
The website has two primary purposes:  
1. A personal portfolio showcasing Hardik’s expertise, projects, and contact details.  
2. A comprehensive one-stop digital nexus for cybersecurity enthusiasts, students, professionals, and recruiters.  
The design should reflect Hardik’s expertise in cybersecurity while providing value to the community through categorized resources, interactive elements, and seamless usability across devices. It should be built using free tools like Next.js, Sanity, Framer Motion, and Tailwind CSS, reflecting trends as of March 07, 2025.

**Key Instructions**:  

1. **Leverage Your Capabilities**:  
   - Use your full potential to innovate, integrate dynamic content, and optimize for performance and interactivity.

2. **Dynamic Content Integration**:  
   - **Task**: Fetch real-time data from cybersecurity sites (e.g., CVE for vulnerabilities, RSS feeds for news, job boards like Indeed).  
   - **Implementation**: Integrate this data into separate pages (e.g., `/hub/news`, `/hub/jobs`) and the "Cyber Pulse" dashboard on the homepage.  
   - **Database**: Use Sanity for content management. Leverage provided schemas (`profile.ts`, `project.ts`, `skill.ts`, etc.) and extend them as needed (e.g., add fields for API data).

3. **Sanity Data Fetching**:  
   - **Schema**: Use provided files (`profile.ts`, `project.ts`, `skill.ts`, etc.) to fetch portfolio data for the homepage and `/portfolio` page.  
   - **Query**: For the homepage, filter featured projects using the `metadata.isFeatured` field.

4. **Inspiration**:  
   - Analyze these websites for innovative features, adapting them into a cyber-tech aesthetic:  
     - [madza.dev](https://www.madza.dev/)  
     - [mathiscool.is-a.dev](https://mathiscool.is-a.dev/)  
     - [dinogomez.vercel.app](https://dinogomez.vercel.app/)  
     - [pazindushane.github.io](https://pazindushane.github.io/)  
     - [hafidziti.dev](https://www.hafidziti.dev/)  
     - [arsalanshakil.github.io/mobile.html](https://arsalanshakil.github.io/mobile.html)  
     - [ashishmehra.dev](https://ashishmehra.dev/)  
     - [sarveshpatil.com/about](https://sarveshpatil.com/about)  
     - [akshaybenny.com](https://www.akshaybenny.com/)  
     - [ifeoluwa-portfolio-five.vercel.app](https://ifeoluwa-portfolio-five.vercel.app/)  
     - [jolienhoop.com](https://jolienhoop.com/)  
     - [abdulrahman.id](https://abdulrahman.id/)

5. **Homepage Design**:  
   - **Purpose**: Provide a brief, captivating overview of the portfolio and cybersecurity hub.  
   - **Sections**:  
     - **Sticky Header Navigation**: Links to Home, Portfolio (`/portfolio`), Cybersecurity Hub (`/hub`), with toggles for theme, content view, and floating icons visibility.  
     - **Hero Section**: Bold introduction with glitch text, gradient animation, vCard download, and QR code.  
     - **About Section**: Concise bio and profile picture.  
     - **Portfolio Overview**: 2-3 featured projects with expandable cards, fetched from Sanity.  
     - **Skills, Experience, Certifications, Tools**: Modular sections with expandable cards.  
     - **"Cyber Pulse" Dashboard**: Real-time widget with cybersecurity news, IP lookup, and latest achievements.  
     - **Floating Contact Icons**: Toggleable icons for quick contact.  
     - **Interactive Elements**: Virtual terminal, 3D cyber globe, custom cursor, mouse-driven glitch effects.  
     - **Footer**: Brief site overview, links to `/portfolio` and `/hub`, and a "Hire Me" modal.

6. **Dedicated Portfolio Page (`/portfolio`)**:  
   - **Purpose**: Comprehensive showcase of all projects.  
   - **Features**:  
     - **Expandable Project Cards**: Fetched from Sanity, with thumbnail, title, description, links, and tech stack.  
     - **Filterable Categories**: Filter by project type (e.g., Penetration Testing, Web Security).  
     - **Downloadable Briefs**: PDF summaries generated dynamically.  
     - **Holographic Timeline**: Parallax scrolling timeline of projects.  
     - **Recruiter Mode**: Toggleable via header; simplifies layout, highlights key sections, and offers a "Download PDF Resume" button.

7. **Technical Implementation**:  
   - **Framework**: Next.js for server-side rendering and performance.  
   - **CMS**: Sanity.io for dynamic content management.  
   - **Styling**: Tailwind CSS for responsive design.  
   - **Animations**: Framer Motion for transitions and interactive elements; `react-tsparticles` for particle effects.  
   - **Real-time Data**: API integrations for news, IP lookup, etc.  
   - **Performance**: Lazy loading, code splitting, and caching.  
   - **Accessibility**: ARIA labels, keyboard navigation, high-contrast options.

8. **Aesthetic and Animations**:  
   - **Default Theme**: Dark mode with neon green (#39FF14) and blue (#00D4FF) accents.  
   - **Animations**: Glitch effects, particle animations, 3D card flips, and subtle scroll animations.

9. **Modular Design**:  
   - Use reusable components (e.g., `Card`, `Section`) for scalability and easy feature additions.

10. **Final Deliverables**:  
    - A fully functional Next.js application with React components for each section.  
    - Sanity.io schema for managing portfolio and hub content.  
    - CSS styles (via Tailwind or custom `globals.css`) for themes and animations.  
    - Documentation for scaling and updating the site.

**Final Note**:  
Use this prompt to create a homepage and portfolio page that blends a personal portfolio with a cybersecurity resource hub in an innovative, interactive design. Leverage your capabilities to optimize every aspect of the design and development process.