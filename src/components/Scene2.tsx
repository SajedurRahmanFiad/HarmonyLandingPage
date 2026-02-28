import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'motion/react';
import { Course } from '../types';
import CourseCard from './CourseCard';
import { Clock } from 'lucide-react';

interface Scene2Props {
  scrollProgress: any;
  courses: Course[];
}

const Scene2 = ({ scrollProgress, courses }: Scene2Props) => {
  // Scene 2 is active from 0.5 to 1.0 of the total scroll progress
  // Let's normalize it to 0-1 for Scene 2's internal use
  const failureProgress = useTransform(scrollProgress, [0.5, 1], [0, 1]);
  
  // Scene 2 specific UI elements
  const countdownOpacity = useTransform(scrollProgress, [0.55, 0.65], [0, 1]);
  const countdownScale = useTransform(scrollProgress, [0.55, 0.65], [0.9, 1]);
  
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 4, mins: 32, secs: 15 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background Tension - subtle darkening */}
      <motion.div 
        style={{ opacity: useTransform(failureProgress, [0, 1], [0, 0.05]) }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      {/* Exam Countdown Corner */}
      <motion.div 
        style={{ opacity: countdownOpacity, scale: countdownScale }}
        className="absolute top-8 right-8 z-[100] bg-white/80 backdrop-blur-md border border-zinc-200 p-4 rounded-2xl shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2 text-zinc-400">
          <Clock size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Final Exam Countdown</span>
        </div>
        <div className="flex gap-4">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="text-xl font-black text-zinc-800 tabular-nums">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-[8px] font-bold text-zinc-400 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Failure Message - appearing subtly */}
      <motion.div 
        style={{ opacity: useTransform(failureProgress, [0.2, 0.5], [0, 0.4]) }}
        className="absolute bottom-12 text-center pointer-events-none"
      >
        <p className="text-zinc-400 text-sm font-medium italic">
          The silence of a dream deferred...
        </p>
      </motion.div>

      {/* Course Cards Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
          {courses.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              scrollProgress={scrollProgress} 
              index={index} 
              isFailureScene={true}
              failureProgress={failureProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene2;
