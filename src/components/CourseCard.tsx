import React from 'react';
import { motion, useTransform } from 'motion/react';
import { User, CheckCircle, Play, TrendingUp, AlertCircle } from 'lucide-react';
import { CourseCardProps } from '../types';

const CourseCard: React.FC<CourseCardProps> = ({ course, scrollProgress, index, isFailureScene, failureProgress }) => {
  // Scene 1 Animation Logic
  const start = 0.02 + (index * 0.02);
  const end = start + 0.08;
  
  const x = useTransform(scrollProgress, [0, start, end], [course.entryDirection.x, course.entryDirection.x, course.finalOffset.x]);
  const y = useTransform(scrollProgress, [0, start, end], [course.entryDirection.y, course.entryDirection.y, course.finalOffset.y]);
  const rotate = useTransform(scrollProgress, [0, start, end], [0, 0, course.finalRotation]);
  const opacity = useTransform(scrollProgress, [start, start + 0.02], [0, 1]);
  const scale = useTransform(scrollProgress, [start, end], [0.8, 1]);

  // Scene 2 Failure Logic
  // failureProgress goes from 0 to 1 during the Scene 2 scroll range
  const grayscale = useTransform(failureProgress || scrollProgress, [0, 0.5], ["grayscale(0%)", "grayscale(100%)"]);
  const sepia = useTransform(failureProgress || scrollProgress, [0.3, 0.8], ["sepia(0%)", "sepia(30%)"]);
  const blur = useTransform(failureProgress || scrollProgress, [0.5, 1], ["blur(0px)", "blur(0.5px)"]);
  
  // Cracks effect (opacity of an overlay)
  const crackOpacity = useTransform(failureProgress || scrollProgress, [0.2, 0.6], [0, 0.15]);

  return (
    <motion.div
      style={{ 
        x, y, rotate, opacity, scale, zIndex: index,
        filter: isFailureScene ? grayscale : "none"
      }}
      className="absolute w-[320px] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden group cursor-pointer transition-all duration-300"
    >
      {/* Crack Overlay */}
      {isFailureScene && (
        <motion.div 
          style={{ opacity: crackOpacity }}
          className="absolute inset-0 pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/cracked-glass.png')] opacity-10"
        />
      )}

      {/* Card Header */}
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <span className={`px-2 py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-wider rounded ${isFailureScene ? 'bg-zinc-100 text-zinc-400' : 'bg-emerald-50 text-emerald-600'}`}>
            {isFailureScene ? 'Access Expiring' : 'Enrollment Active'}
          </span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isFailureScene ? 'text-zinc-400 bg-zinc-50' : 'text-emerald-500 bg-emerald-50'}`}>
            {isFailureScene ? <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />}
            <span className="text-[8px] md:text-[10px] font-bold">{isFailureScene ? 'STALLED' : 'JOINED'}</span>
          </div>
        </div>
        
        <h3 className={`text-lg md:text-xl font-bold mb-2 leading-tight ${isFailureScene ? 'text-zinc-400' : 'text-zinc-900'}`}>
          {course.title}
        </h3>
        
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200">
            <User className="text-zinc-400 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs text-zinc-500 font-medium">Instructor</p>
            <p className={`text-xs md:text-sm font-semibold ${isFailureScene ? 'text-zinc-400' : 'text-zinc-800'}`}>{course.instructor}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm font-medium text-zinc-400 line-through opacity-50">
            {course.price}
          </span>
          <div className={`flex items-center gap-1 font-bold ${isFailureScene ? 'text-zinc-300' : 'text-emerald-600'}`}>
            {isFailureScene ? null : <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />}
            <span className="text-[10px] md:text-sm">{isFailureScene ? 'Module Incomplete' : 'Popular Choice'}</span>
          </div>
        </div>
      </div>

      {/* Hover Content / Failure Info */}
      <div className={`px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-zinc-50 bg-zinc-50/50 ${isFailureScene ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'} transition-opacity duration-300`}>
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <p className="text-[10px] md:text-xs font-bold text-zinc-500">{isFailureScene ? 'LAST WATCHED' : 'PROGRESS'}</p>
          <p className={`text-[10px] md:text-xs font-bold ${isFailureScene ? 'text-zinc-400' : 'text-emerald-600'}`}>
            {isFailureScene ? '3 months ago' : `${course.progress}%`}
          </p>
        </div>
        <div className="w-full h-1 md:h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-3 md:mb-4">
          <motion.div 
            initial={{ width: isFailureScene ? `${course.progress}%` : 0 }}
            animate={{ width: `${course.progress}%` }}
            className={`h-full rounded-full ${isFailureScene ? 'bg-zinc-300' : 'bg-emerald-500'}`}
          />
        </div>
        <button 
          disabled={isFailureScene}
          className={`w-full py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors ${isFailureScene ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-zinc-900 text-white hover:bg-emerald-600'}`}
        >
          {isFailureScene ? 'Test Skipped' : (
            <>
              <Play className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" />
              Start Learning
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
