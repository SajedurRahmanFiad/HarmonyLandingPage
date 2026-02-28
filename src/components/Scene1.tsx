import React from 'react';
import { motion, useTransform } from 'motion/react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface Scene1Props {
  scrollProgress: any;
  courses: Course[];
}

const Scene1 = ({ scrollProgress, courses }: Scene1Props) => {
  const textOpacity = useTransform(scrollProgress, [0, 0.1], [1, 0]);
  const textScale = useTransform(scrollProgress, [0, 0.1], [1, 0.95]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Initial Curiosity Text */}
      <motion.div 
        style={{ opacity: textOpacity, scale: textScale }}
        className="text-center px-6 z-0"
      >
        <h1 className="text-4xl md:text-6xl font-extralight text-slate-400 tracking-tight max-w-3xl mx-auto leading-tight">
          It always starts with <br />
          <span className="text-black font-medium italic relative">
            a promise.
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              className="absolute bottom-2 left-0 h-1 bg-teal-600/20 -z-10"
            />
          </span>
        </h1>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-zinc-200" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Scroll to begin</span>
        </motion.div>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene1;
