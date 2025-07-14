import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import RoundedButton from '../../../components/Button';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState(0);
  const touchStartY = useRef(0);
  const portfolioRef = useRef(null); // Add ref for the portfolio container
  const scrollY = useMotionValue(0);
  const controls = useAnimation();

  const portfolioItems = [
    {
      title: "DIONYSOS RESORTS",
      subtitle: "Luxury Architecture",
      description: "A stunning resort design featuring modern architecture with breathtaking ocean views and infinity pools.",
      image: "/portfolio1.png",
      color: ""
    },
    {
      title: "AZURE RESIDENCES",
      subtitle: "Residential Complex",
      description: "Contemporary residential development with sustainable design and panoramic city views.",
      image: "/portfolio2.png",
      color: ""
    },
    {
      title: "SKYLINE TOWERS",
      subtitle: "Commercial Development",
      description: "Award-winning commercial complex featuring innovative glass facades and green building technologies.",
      image: "/portfolio3.png",
      color: ""
    },
    {
      title: "FOREST RETREAT",
      subtitle: "Eco-Friendly Design",
      description: "Sustainable architecture harmoniously integrated with natural forest environment.",
      image: "/portfolio4.png",
      color: ""
    }
  ];

  // Motion values for smooth parallax effects
  const backgroundY = useTransform(scrollY, [0, 1], ['0%', '-10%']);
  const contentY = useTransform(scrollY, [0, 1], ['0%', '5%']);

  const nextSlide = async () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setDirection(1);

    await controls.start({
      y: [0, -window.innerHeight],
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
    });

    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    controls.set({ y: 0 });
    setIsScrolling(false);
  };

  const prevSlide = async () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setDirection(-1);

    await controls.start({
      y: [0, window.innerHeight],
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
    });

    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    controls.set({ y: 0 });
    setIsScrolling(false);
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

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

  // Fix: Only handle wheel events within the portfolio component
  useEffect(() => {
    const handleWheel = (e) => {
      // Only prevent default if the wheel event is within the portfolio container
      if (portfolioRef.current && portfolioRef.current.contains(e.target)) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    // Add event listener to the document but check if target is within portfolio
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  const getNextIndex = () => (currentIndex + 1) % portfolioItems.length;

  if (!portfolioItems.length) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl opacity-80">No portfolio items available</p>
        </div>
      </div>
    );
  }

  const currentItem = portfolioItems[currentIndex];
  const nextItem = portfolioItems[getNextIndex()];

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? '100vh' : '-100vh',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      y: direction > 0 ? '-100vh' : '100vh',
      opacity: 0,
      scale: 1.05,
    }),
  };

  const contentVariants = {
    enter: {
      y: 60,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -60,
      opacity: 0,
    },
  };

  const overlayVariants = {
    enter: {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      opacity: 0,
    },
    center: {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      opacity: 1,
    },
    exit: {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 0%, 0 0%)',
      opacity: 0,
    },
  };

  return (
    <motion.section
      className="min-h-screen"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <>
        <div
          ref={portfolioRef} // Add ref to the portfolio container
          className="relative w-full h-screen overflow-hidden bg-black"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Background Slides */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${currentItem.image})`,
                  y: backgroundY
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${currentItem.color}`}
                  variants={overlayVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 1.0, delay: 0.2 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${currentIndex}`}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3,
                }}
                style={{ y: contentY }}
              >
                <motion.h1
                  className="text-[40px] underline font-bold  mb-4 drop-shadow-2xl"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {currentItem.title}
                </motion.h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating particles for extra visual flair */}
          <div className="absolute inset-0 z-5 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex my-24 justify-center">
          <RoundedButton className="font-poppins">All work (6)</RoundedButton>
        </div>
      </>
    </motion.section>
  );
};

export default Portfolio;