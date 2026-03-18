import React, { useMemo } from 'react';
import { motion, useTransform } from 'motion/react';
import { Course } from '../types';

interface Scene4DisconnectProps {
  scrollProgress: any;
  courses: Course[];
}

interface ParticleProps {
  key?: React.Key;
  p: any;
  disconnectProgress: any;
}

const Particle = ({ p, disconnectProgress }: ParticleProps) => {
  const opacity = useTransform(disconnectProgress, [0, 0.5, 1], [0, 0.4, 0]);
  const scale = useTransform(disconnectProgress, [0, 1], [1, 3]);

  return (
    <motion.div
      style={{ 
        left: `${50 + p.x}%`, 
        top: `${50 + p.y}%`,
        width: p.size,
        height: p.size,
        opacity,
        scale,
      }}
      animate={{ 
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
      }}
      transition={{ 
        duration: p.duration, 
        repeat: Infinity, 
        ease: "linear",
        delay: p.delay
      }}
      className="absolute bg-white rounded-full blur-[1px]"
    />
  );
};

interface FlickeringCardProps {
  key?: React.Key;
  course: Course;
  index: number;
  isMobile: boolean;
  disconnectProgress: any;
}

const FlickeringCard = ({ course, index, isMobile, disconnectProgress }: FlickeringCardProps) => {
  const initialX = course.finalOffset.x * (isMobile ? 0.5 : 1);
  const initialY = course.finalOffset.y * (isMobile ? 0.5 : 1);

  // Violent movement
  const x = useTransform(disconnectProgress, [0, 0.5, 1], [initialX, initialX + (index % 2 === 0 ? 100 : -100), 0]);
  const y = useTransform(disconnectProgress, [0, 0.5, 1], [initialY, initialY + (index < 3 ? -100 : 100), 0]);
  const rotate = useTransform(disconnectProgress, [0, 0.5, 1], [course.finalRotation, course.finalRotation + 45, 0]);
  const opacity = useTransform(disconnectProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 0.2, 1, 0.2, 1, 0]);
  const scale = useTransform(disconnectProgress, [0, 0.5, 1], [1, 1.2, 0.5]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className="absolute w-[250px] md:w-[320px] aspect-video bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center p-6"
    >
      <div className="text-center">
        <div className="w-12 h-1 bg-white/20 mx-auto mb-4 rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: [-20, 20] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-white/40"
          />
        </div>
        <h3 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">{course.title}</h3>
      </div>
    </motion.div>
  );
};

const Scene4Disconnect = ({ scrollProgress, courses }: Scene4DisconnectProps) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scene 4 is active from 0.6 to 0.8
  const disconnectProgress = useTransform(scrollProgress, [0.6, 0.8], [0, 1]);
  
  // Particle system for the "Storm"
  const particles = useMemo(() => {
    return Array.from({ length: isMobile ? 40 : 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
  }, [isMobile]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* The Storm - Particle System */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <Particle key={p.id} p={p} disconnectProgress={disconnectProgress} />
        ))}
      </div>

      {/* Flickering Cards */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        {courses.map((course, index) => (
          <FlickeringCard 
            key={course.id} 
            course={course} 
            index={index} 
            isMobile={isMobile} 
            disconnectProgress={disconnectProgress} 
          />
        ))}
      </div>

      {/* Center Message */}
      <motion.div 
        style={{ 
          opacity: useTransform(disconnectProgress, [0.7, 0.9], [0, 1]),
          scale: useTransform(disconnectProgress, [0.7, 0.9], [0.9, 1])
        }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
      >
        <h2 className="text-4xl md:text-7xl font-thin text-white tracking-[0.4em] uppercase mb-4">
          Noise
        </h2>
        <div className="h-px w-32 bg-white/20" />
      </motion.div>
    </div>
  );
};

export default Scene4Disconnect;
