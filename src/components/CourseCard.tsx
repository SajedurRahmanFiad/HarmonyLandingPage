import React from 'react';
import { motion, useTransform } from 'motion/react';
import { User, CheckCircle, Play, TrendingUp, AlertCircle } from 'lucide-react';
import { CourseCardProps } from '../types';

const CourseCard: React.FC<CourseCardProps> = ({ course, scrollProgress, index, isFailureScene, failureProgress }) => {
  // Scene 1 Animation Logic
  const start = 0.1 + (index * 0.05);
  const end = start + 0.15;
  
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
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${isFailureScene ? 'bg-zinc-100 text-zinc-400' : 'bg-emerald-50 text-emerald-600'}`}>
            {isFailureScene ? 'Access Expiring' : 'Enrollment Active'}
          </span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isFailureScene ? 'text-zinc-400 bg-zinc-50' : 'text-emerald-500 bg-emerald-50'}`}>
            {isFailureScene ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
            <span className="text-[10px] font-bold">{isFailureScene ? 'STALLED' : 'JOINED'}</span>
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-2 leading-tight ${isFailureScene ? 'text-zinc-400' : 'text-zinc-900'}`}>
          {course.title}
        </h3>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200">
            <User className="text-zinc-400" size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-medium">Instructor</p>
            <p className={`text-sm font-semibold ${isFailureScene ? 'text-zinc-400' : 'text-zinc-800'}`}>{course.instructor}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-400 line-through opacity-50">
            {course.price}
          </span>
          <div className={`flex items-center gap-1 font-bold ${isFailureScene ? 'text-zinc-300' : 'text-emerald-600'}`}>
            {isFailureScene ? null : <TrendingUp size={14} />}
            <span className="text-sm">{isFailureScene ? 'Module Incomplete' : 'Popular Choice'}</span>
          </div>
        </div>
      </div>

      {/* Hover Content / Failure Info */}
      <div className={`px-6 pb-6 pt-2 border-t border-zinc-50 bg-zinc-50/50 ${isFailureScene ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'} transition-opacity duration-300`}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-zinc-500">{isFailureScene ? 'LAST WATCHED' : 'PROGRESS'}</p>
          <p className={`text-xs font-bold ${isFailureScene ? 'text-zinc-400' : 'text-emerald-600'}`}>
            {isFailureScene ? '3 months ago' : `${course.progress}%`}
          </p>
        </div>
        <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: isFailureScene ? `${course.progress}%` : 0 }}
            animate={{ width: `${course.progress}%` }}
            className={`h-full rounded-full ${isFailureScene ? 'bg-zinc-300' : 'bg-emerald-500'}`}
          />
        </div>
        <button 
          disabled={isFailureScene}
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${isFailureScene ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-zinc-900 text-white hover:bg-emerald-600'}`}
        >
          {isFailureScene ? 'Test Skipped' : (
            <>
              <Play size={16} fill="currentColor" />
              Start Learning
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
