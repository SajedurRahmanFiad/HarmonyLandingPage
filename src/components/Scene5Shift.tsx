import React, { useMemo } from 'react';
import { motion, useTransform, useSpring } from 'motion/react';
import { Sparkles, Target, CheckCircle, Compass } from 'lucide-react';

interface Scene5ShiftProps {
  scrollProgress: any;
}

interface ConstellationNodeProps {
  key?: React.Key;
  node: any;
  index: number;
  smoothShift: any;
}

const ConstellationNode = ({ node, index, smoothShift }: ConstellationNodeProps) => {
  const start = 0.3 + (index * 0.1);
  const end = start + 0.2;
  const nodeAppearance = useTransform(smoothShift, [start, end], [0, 1]);
  const nodeScale = useSpring(nodeAppearance, { stiffness: 100, damping: 15 });
  const labelOpacity = useTransform(smoothShift, [end, end + 0.1], [0, 1]);

  return (
    <motion.div
      style={{ 
        left: `${50 + node.x}%`, 
        top: `${50 + node.y}%`,
        opacity: nodeAppearance,
        scale: nodeScale
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
    >
      {/* Glowing Planet */}
      <div className="relative group cursor-pointer">
        <motion.div 
          style={{ backgroundColor: node.color }}
          className="w-4 h-4 md:w-6 md:h-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] z-10 relative"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundColor: node.color }}
          className="absolute inset-0 rounded-full blur-md"
        />
        
        {/* Label Tooltip */}
        <motion.div 
          style={{ opacity: labelOpacity }}
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 text-center"
        >
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{node.label}</p>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-lg flex items-center justify-center gap-2">
            <CheckCircle size={10} className="text-teal-400" />
            <span className="text-[9px] font-medium text-zinc-300">{node.outcome}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ConstellationLineProps {
  key?: React.Key;
  prev: any;
  c: any;
  index: number;
  smoothShift: any;
}

const ConstellationLine = ({ prev, c, index, smoothShift }: ConstellationLineProps) => {
  const opacity = useTransform(smoothShift, [0.2, 0.5], [0, 0.15]);
  const pathLength = useTransform(smoothShift, [0.3, 0.7], [0, 1]);

  return (
    <motion.line
      key={`line-${index}`}
      x1={`${50 + prev.x}%`}
      y1={`${50 + prev.y}%`}
      x2={`${50 + c.x}%`}
      y2={`${50 + c.y}%`}
      stroke="white"
      strokeWidth="1"
      strokeDasharray="4 4"
      style={{ 
        opacity,
        pathLength
      }}
    />
  );
};

const Scene5Shift = ({ scrollProgress }: Scene5ShiftProps) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scene 5 is active from 0.8 to 1.0
  const shiftProgress = useTransform(scrollProgress, [0.8, 1], [0, 1]);
  const smoothShift = useSpring(shiftProgress, { stiffness: 100, damping: 30 });

  const constellations = useMemo(() => [
    { id: 1, label: 'Core Mechanics', outcome: 'Conceptual Mastery', x: isMobile ? -20 : -25, y: isMobile ? -35 : -30, color: '#14b8a6' },
    { id: 2, label: 'Organic Synthesis', outcome: 'Reaction Precision', x: isMobile ? 25 : 30, y: isMobile ? -15 : -15, color: '#0ea5e9' },
    { id: 3, label: 'Strategic Analysis', outcome: 'Decision Speed', x: isMobile ? -15 : -15, y: isMobile ? 20 : 25, color: '#8b5cf6' },
    { id: 4, label: 'Advanced Calculus', outcome: 'Analytical Depth', x: isMobile ? 20 : 25, y: isMobile ? 35 : 35, color: '#f43f5e' },
  ], [isMobile]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111827_0%,#09090b_100%)]" />
      
      {/* Star Field */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
            }}
          />
        ))}
      </div>

      {/* The Constellation Map */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {constellations.map((c, i) => {
            if (i === 0) return null;
            const prev = constellations[i - 1];
            return (
              <ConstellationLine 
                key={`line-${i}`} 
                prev={prev} 
                c={c} 
                index={i} 
                smoothShift={smoothShift} 
              />
            );
          })}
        </svg>

        {/* Planets / Nodes */}
        {constellations.map((node, index) => (
          <ConstellationNode 
            key={node.id} 
            node={node} 
            index={index} 
            smoothShift={smoothShift} 
          />
        ))}

        {/* Central Core */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothShift, [0, 0.3], [0, 1]),
            scale: useTransform(smoothShift, [0, 0.3], [0.8, 1])
          }}
          className="absolute flex flex-col items-center gap-6"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 md:w-48 md:h-48 border border-white/5 rounded-full flex items-center justify-center"
            >
              <div className="w-full h-full border-t border-teal-500/30 rounded-full animate-pulse" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass size={32} className="text-white/20" />
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-[0.2em] uppercase mb-2">
              The <span className="text-teal-400 font-bold">System</span>
            </h2>
            <p className="text-zinc-500 text-[10px] md:text-xs font-mono tracking-widest uppercase">
              Continuity Established
            </p>
          </div>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div 
        style={{ 
          opacity: useTransform(smoothShift, [0.8, 1], [0, 1]),
          y: useTransform(smoothShift, [0.8, 1], [20, 0])
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <button className="group relative px-8 py-3 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95">
          <div className="absolute inset-0 bg-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
            Start Your Journey <Target size={18} />
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default Scene5Shift;
