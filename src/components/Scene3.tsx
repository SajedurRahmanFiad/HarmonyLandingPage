import React from 'react';
import { motion, useTransform } from 'motion/react';
import { Calendar, Youtube, FileText, Bookmark, AlertCircle } from 'lucide-react';

interface Scene3Props {
  scrollProgress: any;
}

const Scene3 = ({ scrollProgress }: Scene3Props) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scene 3 is active from 0.66 to 1.0 of the total scroll progress
  const effortProgress = useTransform(scrollProgress, [0.66, 1], [0, 1]);

  // Floating Tiles Data
  const tiles = [
    {
      id: 'planner',
      icon: <Calendar className="text-blue-500" size={20} />,
      title: 'Study Planner',
      content: 'Week 4: Organic Chemistry',
      status: 'Overdue',
      initialPos: { x: isMobile ? -80 : -200, y: isMobile ? -180 : -150 },
      drift: { x: isMobile ? -40 : -150, y: isMobile ? -50 : -100 }
    },
    {
      id: 'history',
      icon: <Youtube className="text-red-500" size={20} />,
      title: 'Watch History',
      content: 'HSC Physics - Lecture 12',
      status: '2:45 / 1:15:00',
      initialPos: { x: isMobile ? 80 : 250, y: isMobile ? -100 : -100 },
      drift: { x: isMobile ? 30 : 100, y: isMobile ? -80 : -200 }
    },
    {
      id: 'notes',
      icon: <FileText className="text-amber-500" size={20} />,
      title: 'Quick Notes',
      content: 'Integration Formulas...',
      status: 'Incomplete',
      initialPos: { x: isMobile ? -90 : -280, y: isMobile ? 150 : 120 },
      drift: { x: isMobile ? -20 : -100, y: isMobile ? 40 : 150 }
    },
    {
      id: 'bookmarks',
      icon: <Bookmark className="text-emerald-500" size={20} />,
      title: 'Bookmarks',
      content: 'Reference Book PDF',
      status: 'Saved 1 month ago',
      initialPos: { x: isMobile ? 90 : 220, y: isMobile ? 180 : 180 },
      drift: { x: isMobile ? 40 : 200, y: isMobile ? 20 : 50 }
    }
  ];

  const captionOpacity1 = useTransform(effortProgress, [0.1, 0.3], [0, 1]);
  const captionOpacity2 = useTransform(effortProgress, [0.4, 0.6], [0, 1]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-50">
      {/* Background Grid - subtle and disconnected */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Floating Tiles */}
      <div className="relative w-full h-full flex items-center justify-center">
        {tiles.map((tile, index) => {
          const x = useTransform(effortProgress, [0, 1], [tile.initialPos.x, tile.initialPos.x + tile.drift.x]);
          const y = useTransform(effortProgress, [0, 1], [tile.initialPos.y, tile.initialPos.y + tile.drift.y]);
          const rotate = useTransform(effortProgress, [0, 1], [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? -10 : 10]);
          const opacity = useTransform(effortProgress, [0, 0.2], [0, 1]);

          return (
            <motion.div
              key={tile.id}
              style={{ x, y, rotate, opacity }}
              className="absolute w-48 md:w-64 bg-white p-3 md:p-4 rounded-xl shadow-lg border border-zinc-100 flex flex-col gap-2 md:gap-3 pointer-events-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {tile.icon}
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{tile.title}</span>
                </div>
                <AlertCircle size={14} className="text-zinc-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-800 leading-tight">{tile.content}</p>
                <p className="text-[10px] font-medium text-zinc-400 mt-1">{tile.status}</p>
              </div>
              <div className="w-full h-1 bg-zinc-50 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-zinc-200" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Center Caption */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
        <motion.h2 
          style={{ opacity: captionOpacity1 }}
          className="text-3xl md:text-5xl font-extralight text-zinc-400 tracking-tight text-center mb-4"
        >
          You tried <span className="text-zinc-900 font-medium italic">harder.</span>
        </motion.h2>
        <motion.h2 
          style={{ opacity: captionOpacity2 }}
          className="text-3xl md:text-5xl font-extralight text-zinc-400 tracking-tight text-center"
        >
          Nothing <span className="text-zinc-900 font-medium italic">changed.</span>
        </motion.h2>
      </div>

      {/* Disconnected Lines - visual metaphor */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <motion.path
          d="M 100 100 L 200 150"
          stroke="black"
          strokeWidth="1"
          strokeDasharray="4 4"
          style={{ pathLength: useTransform(effortProgress, [0, 0.5], [0, 0.2]) }}
        />
        <motion.path
          d="M 800 600 L 700 500"
          stroke="black"
          strokeWidth="1"
          strokeDasharray="4 4"
          style={{ pathLength: useTransform(effortProgress, [0.2, 0.7], [0, 0.3]) }}
        />
      </svg>
    </div>
  );
};

export default Scene3;
