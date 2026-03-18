import React from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';
import { Course } from '../types';

interface Scene4Props {
  scrollProgress: MotionValue<number>;
  courses: Course[];
}

const Scene4 = ({ scrollProgress, courses }: Scene4Props) => {
  // scrollProgress is already normalized to [0, 1] for this scene
  const sceneProgress = scrollProgress;

  const fadeOut = useTransform(sceneProgress, [0, 0.5], [1, 0]);
  const alignmentLoss = useTransform(sceneProgress, [0, 0.8], [0, 100]);
  const rotationLoss = useTransform(sceneProgress, [0, 0.8], [0, 45]);
  
  // Floating elements like notes, scores
  const floatingElements = [
    { id: 1, text: "92%", type: "score", initial: { x: -150, y: -100 } },
    { id: 2, text: "Chapter 4 Notes", type: "note", initial: { x: 180, y: -150 } },
    { id: 3, text: "A+", type: "score", initial: { x: -200, y: 120 } },
    { id: 4, text: "Formula Sheet", type: "note", initial: { x: 220, y: 80 } },
    { id: 5, text: "85/100", type: "score", initial: { x: 50, y: -200 } },
  ];

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background - pure white for the "fading to nothing" feel */}
      <div className="absolute inset-0 bg-white" />

      {/* Courses separating from progress */}
      <div className="relative w-full h-full flex items-center justify-center">
        {courses.map((course, index) => {
          const driftX = useTransform(sceneProgress, [0, 1], [0, (index % 2 === 0 ? -1 : 1) * 300]);
          const driftY = useTransform(sceneProgress, [0, 1], [0, (index < 2 ? -1 : 1) * 200]);
          const opacity = useTransform(sceneProgress, [0, 0.7], [1, 0]);
          const scale = useTransform(sceneProgress, [0, 1], [1, 0.8]);

          return (
            <motion.div
              key={course.id}
              style={{ 
                x: driftX, 
                y: driftY, 
                opacity,
                scale,
                rotate: useTransform(sceneProgress, [0, 1], [course.finalRotation, course.finalRotation + (index % 2 === 0 ? -20 : 20)])
              }}
              className="absolute w-64 p-4 bg-zinc-50 border border-zinc-100 rounded-xl shadow-sm"
            >
              <div className="h-2 w-full bg-zinc-200 rounded-full mb-2 overflow-hidden">
                {/* Progress bar detaching */}
                <motion.div 
                  style={{ 
                    x: useTransform(sceneProgress, [0, 0.5], [0, 50]),
                    opacity: useTransform(sceneProgress, [0, 0.3], [1, 0])
                  }}
                  className="h-full bg-zinc-400" 
                  initial={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-xs font-bold text-zinc-400 truncate">{course.title}</p>
            </motion.div>
          );
        })}

        {/* Floating scores and notes detaching */}
        {floatingElements.map((el) => {
          const driftX = useTransform(sceneProgress, [0, 1], [el.initial.x, el.initial.x + (Math.random() - 0.5) * 400]);
          const driftY = useTransform(sceneProgress, [0, 1], [el.initial.y, el.initial.y + (Math.random() - 0.5) * 400]);
          const opacity = useTransform(sceneProgress, [0, 0.8], [0.6, 0]);
          const rotate = useTransform(sceneProgress, [0, 1], [0, (Math.random() - 0.5) * 90]);

          return (
            <motion.div
              key={el.id}
              style={{ x: driftX, y: driftY, opacity, rotate }}
              className={`absolute px-3 py-1 rounded-full border ${
                el.type === 'score' ? 'bg-zinc-50 border-zinc-200 text-zinc-400' : 'bg-white border-zinc-100 text-zinc-300'
              } text-xs font-medium shadow-sm`}
            >
              {el.text}
            </motion.div>
          );
        })}
      </div>

      {/* Center Text - brief stillness at the end */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.p
          style={{ 
            opacity: useTransform(sceneProgress, [0.7, 0.9, 1], [0, 1, 0]),
            scale: useTransform(sceneProgress, [0.7, 1], [0.9, 1.1])
          }}
          className="text-2xl font-extralight text-zinc-300 tracking-[0.2em] uppercase"
        >
          Stillness
        </motion.p>
      </div>
    </div>
  );
};

export default Scene4;
