import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { Course } from './types';
import Scene1 from './components/Scene1';
import Scene2 from './components/Scene2';

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene 1: 0 to 0.5
  // Scene 2: 0.5 to 1.0
  const scene1Opacity = useTransform(scrollYProgress, [0.45, 0.5], [1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.5, 0.55], [0, 1]);

  return (
    <div ref={containerRef} className="relative bg-white h-[600vh]">
      {/* Scene 1: The Promise */}
      <motion.div 
        style={{ 
          opacity: scene1Opacity, 
          pointerEvents: useTransform(scrollYProgress, [0.45, 0.5], ["auto", "none"]),
          display: useTransform(scrollYProgress, [0.5, 0.51], ["block", "none"])
        }}
        className="fixed inset-0 z-10"
      >
        <Scene1 scrollProgress={scrollYProgress} courses={courses} />
      </motion.div>

      {/* Scene 2: The Quiet Failure */}
      <motion.div 
        style={{ 
          opacity: scene2Opacity, 
          pointerEvents: useTransform(scrollYProgress, [0.5, 0.55], ["none", "auto"]),
          display: useTransform(scrollYProgress, [0.49, 0.5], ["none", "block"])
        }}
        className="fixed inset-0 z-20"
      >
        <Scene2 scrollProgress={scrollYProgress} courses={courses} />
      </motion.div>

      {/* Spacer to allow scrolling */}
      <div className="h-[600vh] pointer-events-none" />
    </div>
  );
}
