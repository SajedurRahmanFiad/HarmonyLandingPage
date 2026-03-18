import React, { useRef } from 'react';
import { motion, useTransform, useSpring, MotionValue } from 'motion/react';
import { Check, Zap, Star, Trophy, BookOpen, Target } from 'lucide-react';

interface Scene5Props {
  scrollProgress: MotionValue<number>;
}

const Scene5 = ({ scrollProgress }: Scene5Props) => {
  // scrollProgress is already normalized to [0, 1] for this scene
  const sceneProgress = scrollProgress;
  
  // Smooth the scroll progress for a more "stable" feel
  const smoothProgress = useSpring(sceneProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const nodes = [
    { id: 1, icon: <BookOpen size={18} />, label: "The Foundation", color: "bg-emerald-500" },
    { id: 2, icon: <Target size={18} />, label: "The Focus", color: "bg-blue-500" },
    { id: 3, icon: <Zap size={18} />, label: "The Momentum", color: "bg-amber-500" },
    { id: 4, icon: <Star size={18} />, label: "The Mastery", color: "bg-indigo-500" },
    { id: 5, icon: <Trophy size={18} />, label: "The Result", color: "bg-rose-500" },
  ];

  const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  const streakOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const streakY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-50">
      {/* Background - subtle grid but more structured than before */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* The Shift Header */}
      <motion.div 
        style={{ 
          opacity: useTransform(sceneProgress, [0, 0.15], [0, 1]),
          y: useTransform(sceneProgress, [0, 0.15], [20, 0])
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-2 block">The Shift</span>
        <h2 className="text-2xl md:text-3xl font-light text-zinc-900 tracking-tight">
          A <span className="font-medium italic">different</span> path.
        </h2>
      </motion.div>

      {/* The Vertical Path Container */}
      <div className="relative h-[60vh] w-full max-w-xs flex flex-col items-center justify-between py-10">
        {/* The Path Line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-zinc-200 left-1/2 -translate-x-1/2 overflow-hidden">
          <motion.div 
            style={{ height: useTransform(smoothProgress, [0, 0.8], ["0%", "100%"]) }}
            className="w-full bg-zinc-900 origin-top"
          />
          {/* The Streak */}
          <motion.div 
            style={{ 
              opacity: streakOpacity,
              top: streakY
            }}
            className="absolute w-full h-20 bg-gradient-to-b from-transparent via-zinc-900 to-transparent"
          />
        </div>

        {/* The Nodes */}
        {nodes.map((node, index) => {
          const nodeThreshold = index / (nodes.length - 1) * 0.8;
          const isFilled = useTransform(smoothProgress, [nodeThreshold - 0.05, nodeThreshold], [0, 1]);
          const scale = useTransform(smoothProgress, [nodeThreshold - 0.1, nodeThreshold], [0.8, 1]);
          const opacity = useTransform(smoothProgress, [nodeThreshold - 0.2, nodeThreshold - 0.1], [0, 1]);

          return (
            <div key={node.id} className="relative flex items-center justify-center w-full">
              {/* Node Circle */}
              <motion.div 
                style={{ scale, opacity }}
                className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center shadow-sm"
              >
                <motion.div 
                  style={{ opacity: isFilled }}
                  className={`absolute inset-0 rounded-full ${node.color} flex items-center justify-center text-white`}
                >
                  {node.icon}
                </motion.div>
                <div className="text-zinc-400">
                  {node.icon}
                </div>
              </motion.div>

              {/* Node Label */}
              <motion.div 
                style={{ 
                  opacity: useTransform(smoothProgress, [nodeThreshold - 0.05, nodeThreshold], [0, 1]),
                  x: useTransform(smoothProgress, [nodeThreshold - 0.05, nodeThreshold], [20, 0])
                }}
                className="absolute left-16 whitespace-nowrap"
              >
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-0.5">{node.label}</p>
                <div className="h-1 w-8 bg-zinc-200 rounded-full overflow-hidden">
                   <motion.div 
                    style={{ width: useTransform(smoothProgress, [nodeThreshold, nodeThreshold + 0.1], ["0%", "100%"]) }}
                    className={`h-full ${node.color}`}
                   />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Bottom Message */}
      <motion.div 
        style={{ 
          opacity: useTransform(sceneProgress, [0.85, 0.95], [0, 1]),
          y: useTransform(sceneProgress, [0.85, 0.95], [20, 0])
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full px-6"
      >
        <p className="text-lg md:text-xl font-light text-zinc-500 leading-relaxed max-w-md mx-auto">
          Everything <span className="text-zinc-900 font-medium">responds</span> together.
        </p>
      </motion.div>
    </div>
  );
};

export default Scene5;
