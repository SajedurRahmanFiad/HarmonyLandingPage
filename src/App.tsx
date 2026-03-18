import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { Course } from './types';
import Scene1 from './components/Scene1';
import Scene2 from './components/Scene2';
import Scene3 from './components/Scene3';
import LandingPage from './components/LandingPage';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Complete HSC Physics Batch",
    instructor: "Dr. Ariful Islam",
    price: "৳4500",
    progress: 12,
    entryDirection: { x: -1000, y: -500 },
    finalRotation: -5,
    finalOffset: { x: -10, y: -20 }
  },
  {
    id: 2,
    title: "Crash Course Chemistry",
    instructor: "Nabil Ahmed",
    price: "৳3200",
    progress: 45,
    entryDirection: { x: 1000, y: -500 },
    finalRotation: 3,
    finalOffset: { x: 15, y: 10 }
  },
  {
    id: 3,
    title: "Top Rank Preparation",
    instructor: "Sajid Hasan",
    price: "৳5000",
    progress: 8,
    entryDirection: { x: -1000, y: 500 },
    finalRotation: -2,
    finalOffset: { x: -5, y: 30 }
  },
  {
    id: 4,
    title: "Advanced Mathematics 2026",
    instructor: "Zubair Bin Sayeed",
    price: "৳4800",
    progress: 25,
    entryDirection: { x: 1000, y: 500 },
    finalRotation: 6,
    finalOffset: { x: 20, y: -15 }
  },
  {
    id: 5,
    title: "English Grammar Mastery",
    instructor: "Tasnim Ara",
    price: "৳2500",
    progress: 60,
    entryDirection: { x: 0, y: 1000 },
    finalRotation: 1,
    finalOffset: { x: 0, y: 0 }
  }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [showLanding, setShowLanding] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 0.99 && !showLanding) {
        setShowLanding(true);
        window.scrollTo(0, 0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, showLanding]);


  // Scale course positions for mobile
  const responsiveCourses = courses.map(course => ({
    ...course,
    entryDirection: {
      x: isMobile ? course.entryDirection.x * 0.4 : course.entryDirection.x,
      y: isMobile ? course.entryDirection.y * 0.4 : course.entryDirection.y,
    },
    finalOffset: {
      x: isMobile ? course.finalOffset.x * 0.5 : course.finalOffset.x,
      y: isMobile ? course.finalOffset.y * 0.5 : course.finalOffset.y,
    }
  }));

  // Scene 1: 0 to 0.3
  // Scene 2: 0.3 to 0.6
  // Scene 3: 0.6 to 0.9
  // Transition: 0.9 to 1.0
  const scene1Opacity = useTransform(scrollYProgress, [0.27, 0.3], [1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.3, 0.33, 0.57, 0.6], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.6, 0.63, 0.87, 0.9], [0, 1, 1, 0]);
  
  const transitionOpacity = useTransform(scrollYProgress, [0.9, 0.95, 0.98, 1], [0, 1, 1, 0]);
  const onboardingContainerOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);

  if (showLanding) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="min-h-screen bg-[#F8F9FA]"
      >
        <LandingPage />
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-white h-[1000vh]">
      <motion.div style={{ opacity: onboardingContainerOpacity }} className="fixed inset-0">
        {/* Scene 1: The Promise */}
        <motion.div 
          style={{ 
            opacity: scene1Opacity, 
            pointerEvents: useTransform(scrollYProgress, [0.27, 0.3], ["auto", "none"]),
            display: useTransform(scrollYProgress, [0.3, 0.31], ["block", "none"])
          }}
          className="fixed inset-0 z-10"
        >
          <Scene1 scrollProgress={scrollYProgress} courses={responsiveCourses} />
        </motion.div>

        {/* Scene 2: The Quiet Failure */}
        <motion.div 
          style={{ 
            opacity: scene2Opacity, 
            pointerEvents: useTransform(scrollYProgress, [0.3, 0.33, 0.57, 0.6], ["none", "auto", "auto", "none"]),
            display: useTransform(scrollYProgress, [0.29, 0.3, 0.6, 0.61], ["none", "block", "block", "none"])
          }}
          className="fixed inset-0 z-20"
        >
          <Scene2 scrollProgress={scrollYProgress} courses={responsiveCourses} />
        </motion.div>

        {/* Scene 3: The Effort Loop */}
        <motion.div 
          style={{ 
            opacity: scene3Opacity, 
            pointerEvents: useTransform(scrollYProgress, [0.6, 0.63, 0.87, 0.9], ["none", "auto", "auto", "none"]),
            display: useTransform(scrollYProgress, [0.59, 0.6, 0.9, 0.91], ["none", "block", "block", "none"])
          }}
          className="fixed inset-0 z-30"
        >
          <Scene3 scrollProgress={scrollYProgress} />
        </motion.div>
      </motion.div>

      {/* Final Transition Logo */}
      <motion.div 
        style={{ opacity: transitionOpacity }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white rounded-full" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter">Harmony</h2>
          <p className="text-zinc-400 font-medium italic">Find your flow.</p>
        </div>
      </motion.div>

      {/* Spacer to allow scrolling */}
      <div className="h-[1000vh] pointer-events-none" />
    </div>
  );
}
