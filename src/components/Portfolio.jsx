import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationRef = useRef();
  const touchStartY = useRef(0);

  const portfolioItems = [
    {
      title: "Project One",
      subtitle: "Web Development",
      description: "A beautiful web application built with React and modern technologies.",
      image: "/portfolio1.png"
    },
    {
      title: "Project Two",
      subtitle: "Mobile App",
      description: "An innovative mobile application that solves real-world problems.",
      image: "/portfolio2.png"
    },
    {
      title: "Project Three",
      subtitle: "UI/UX Design",
      description: "Creative design solutions that enhance user experience and engagement.",
      image: "/portfolio3.png"
    },
    {
      title: "Project Four",
      subtitle: "E-commerce Platform",
      description: "A comprehensive e-commerce solution with advanced features and seamless user experience.",
      image: "/portfolio4.png"
    }
  ];

  // Cancel any ongoing animation when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const animateTransition = (direction, callback) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    let startTime = null;
    const duration = 800; // ms
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation (easeInOutCubic)
      const easing = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        callback();
        setIsScrolling(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const nextSlide = () => {
    animateTransition('down', () => {
      setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    });
  };

  const prevSlide = () => {
    animateTransition('up', () => {
      setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    });
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;
    
    if (Math.abs(deltaY) > 50) { // Minimum swipe distance
      if (deltaY > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  // Keyboard and wheel events remain the same
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const currentItem = portfolioItems[currentIndex];

  // Safety check: if no items or current item is undefined, show loading/empty state
  if (!portfolioItems.length || !currentItem) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center font-poppins">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl opacity-80">No portfolio items available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-screen font-poppins overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image with improved transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{
          backgroundImage: `url(${currentItem.image})`,
          transform: isScrolling ? 'scale(1.03)' : 'scale(1)',
          opacity: isScrolling ? 0.9 : 1,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-1000"></div>
      </div>

      {/* Content with improved transitions */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-8">
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] ${isScrolling ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-4 drop-shadow-lg">
            {currentItem.title}
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8 opacity-90">
            {currentItem.subtitle}
          </p>
          <div className="w-24 h-px bg-white mx-auto mb-8 transition-all duration-1000 delay-150"></div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed transition-all duration-1000 delay-200">
            {currentItem.description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isScrolling}
        className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors duration-300 disabled:opacity-50"
      >
        <ChevronUp size={48} className="transition-transform duration-300 hover:scale-110" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isScrolling}
        className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors duration-300 disabled:opacity-50"
      >
        <ChevronDown size={48} className="transition-transform duration-300 hover:scale-110" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-4">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                animateTransition(index > currentIndex ? 'down' : 'up', () => {
                  setCurrentIndex(index);
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-40 hover:bg-opacity-60 scale-100'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-20">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ width: `${((currentIndex + 1) / portfolioItems.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 left-8 z-20 text-white font-light text-lg transition-opacity duration-500">
        <span className="text-2xl font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="opacity-60"> / {String(portfolioItems.length).padStart(2, '0')}</span>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 right-8 z-20 text-white text-sm opacity-60 transition-opacity duration-500">
        <p>Scroll, swipe, or use arrow keys to navigate</p>
      </div>
    </div>
  );
};

export default Portfolio;