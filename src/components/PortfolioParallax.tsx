import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Navbar menu items
const navItems = ["Me", "Projects", "Skills", "Resume", "Contact"];

export default function PortfolioParallax() {
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const currentSection = useRef(0);
  const isAnimating = useRef(false);
  
  // Calculate section width
  const getSectionWidth = useCallback(() => {
    return window.innerWidth;
  }, []);

  // Navigate to a specific section
  const goToSection = useCallback((index: number) => {
    if (isAnimating.current || !sectionsRef.current || !bgRef.current) return;
    
    isAnimating.current = true;
    const sectionWidth = getSectionWidth();
    const targetX = -index * sectionWidth;
    // 1:1 background movement - no parallax offset since each bg image maps to each section
    const bgTargetX = index * sectionWidth; // Background moves exactly with sections
    
    // Animate sections container
    gsap.to(sectionsRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimating.current = false;
        currentSection.current = index;
        setActiveSection(index);
      }
    });
    
    // Animate background with 1:1 movement (no parallax)
    gsap.to(bgRef.current, {
      x: -bgTargetX,
      duration: 0.8,
      ease: "power2.inOut"
    });
  }, [getSectionWidth]);

  // Handle wheel scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isAnimating.current) return;
      
      const delta = e.deltaY;
      let newSection = currentSection.current;
      
      if (delta > 0 && newSection < navItems.length - 1) {
        newSection++;
      } else if (delta < 0 && newSection > 0) {
        newSection--;
      }
      
      if (newSection !== currentSection.current) {
        goToSection(newSection);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [goToSection]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;
      
      if (Math.abs(deltaX) > 50 && !isAnimating.current) {
        let newSection = currentSection.current;
        
        if (deltaX > 0 && newSection < navItems.length - 1) {
          newSection++;
        } else if (deltaX < 0 && newSection > 0) {
          newSection--;
        }
        
        if (newSection !== currentSection.current) {
          goToSection(newSection);
        }
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
      
      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [goToSection]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      
      let newSection = currentSection.current;
      
      if (e.key === "ArrowLeft" && newSection > 0) {
        newSection--;
      } else if (e.key === "ArrowRight" && newSection < navItems.length - 1) {
        newSection++;
      }
      
      if (newSection !== currentSection.current) {
        goToSection(newSection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToSection]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      // Recalculate position for current section
      if (sectionsRef.current && bgRef.current) {
        const sectionWidth = getSectionWidth();
        const targetX = -currentSection.current * sectionWidth;
        const bgTargetX = currentSection.current * sectionWidth; // 1:1 movement, no parallax
        
        gsap.set(sectionsRef.current, { x: targetX });
        gsap.set(bgRef.current, { x: -bgTargetX });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSectionWidth]);

  // Update gliding underline position
  useEffect(() => {
    if (!navRef.current) return;
    
    const navItems = navRef.current.children;
    const activeItem = navItems[activeSection] as HTMLElement;
    
    if (activeItem) {
      const itemRect = activeItem.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      
      // Calculate position relative to nav container
      const left = itemRect.left - navRect.left;
      const width = itemRect.width;
      
      // Update CSS custom properties for smooth transition
      navRef.current.style.setProperty('--underline-left', `${left}px`);
      navRef.current.style.setProperty('--underline-width', `${width}px`);
      navRef.current.style.setProperty('--underline-opacity', '1');
    }
  }, [activeSection]);

  // Handle navigation clicks
  const handleNavClick = useCallback((index: number) => {
    goToSection(index);
  }, [goToSection]);

  // Initialize component and preload images
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBgImageLoaded(true);
      console.log('Stitched 2.5K background image (12,800×1,440) loaded successfully');
    };
    img.onerror = () => {
      setBgImageLoaded(true);
      console.log('Stitched background image failed to load, using fallback');
    };
    
    img.src = '/upscale_design.png';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Set initial positions
      if (sectionsRef.current && bgRef.current) {
        gsap.set(sectionsRef.current, { x: 0 });
        gsap.set(bgRef.current, { x: 0 });
      }
      
      // Initialize underline position
      setTimeout(() => {
        if (navRef.current) {
          const navItems = navRef.current.children;
          const activeItem = navItems[0] as HTMLElement;
          
          if (activeItem) {
            const itemRect = activeItem.getBoundingClientRect();
            const navRect = navRef.current.getBoundingClientRect();
            
            const left = itemRect.left - navRect.left;
            const width = itemRect.width;
            
            navRef.current.style.setProperty('--underline-left', `${left}px`);
            navRef.current.style.setProperty('--underline-width', `${width}px`);
            navRef.current.style.setProperty('--underline-opacity', '1');
          }
        }
      }, 100);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio-container" ref={containerRef}>
      {/* Loading screen */}
      {(isLoading || !bgImageLoaded) && (
        <div className="loading-screen">
          <div className="loader"></div>
          <p>{!bgImageLoaded ? 'Loading background...' : 'Loading experience...'}</p>
        </div>
      )}
      
      {/* Floating navbar */}
      <nav className="floating-nav">
        <ul ref={navRef}>
          {navItems.map((item, index) => (
            <li 
              key={item} 
              className={activeSection === index ? "active" : ""}
              onClick={() => handleNavClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Parallax background - using upscale_design.png */}
      <div
        ref={bgRef}
        className="parallax-bg"
        style={{
          '--bg-image-png': 'url(/upscale_design.png)',
          '--bg-image-fallback': 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=4000&q=80)'
        } as React.CSSProperties}
      />

    {/* Scroll indicator */}
      <div className="scroll-indicator">
        Scroll, use arrows, or click navigation ↑
      </div>
      
      {/* Progress indicator */}
      <div className="progress-indicator">
        <div className="progress-dots">
          {navItems.map((_, index) => (
            <div 
              key={index}
              className={`dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => handleNavClick(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Scrollable sections container */}
      <div
        ref={sectionsRef}
        className="sections-container"
      >
        {/* Individual sections */}
        {navItems.map((item) => (
          <div 
            key={item} 
            className="section-panel"
          >
            <div className="content">
              <h2>{item}</h2>
              {item === "Me" && (
                <div>
                  <p>Welcome to my portfolio. I'm a passionate developer with a love for creating smooth, interactive experiences.</p>
                  <p>Scroll horizontally to explore my work!</p>
                </div>
              )}
              {item === "Projects" && (
                <div>
                  <p>Here are some of my featured projects. Each demonstrates my skills in different technologies.</p>
                  <p>From web applications to mobile apps, I create digital solutions that make a difference.</p>
                </div>
              )}
              {item === "Skills" && (
                <div>
                  <p>My technical skills include frontend and backend development, UX/UI design, and more.</p>
                  <p>JavaScript, React, Node.js, Python, and many other technologies in my toolkit.</p>
                </div>
              )}
              {item === "Resume" && (
                <div>
                  <p>Check out my professional experience and education background.</p>
                  <p>Years of experience building scalable and performant applications.</p>
                </div>
              )}
              {item === "Contact" && (
                <div>
                  <p>Let's connect! You can reach me through email or social media.</p>
                  <p>Ready to collaborate on your next project.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
