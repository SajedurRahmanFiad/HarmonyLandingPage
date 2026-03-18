import React from 'react';
import { motion } from 'motion/react';
import { Search, Bell, User, BookOpen, Clock, Star, ChevronRight, Layout, Calendar, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  React.useEffect(() => {
    // Ensure we scroll to top after the page has rendered and layout is stable
    const handleScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    handleScroll();
    // Double check after a frame
    requestAnimationFrame(handleScroll);
    // Triple check after a small delay just in case of dynamic content
    const timer = setTimeout(handleScroll, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Physics", "Chemistry", "Math", "Biology", "English"];
  
  const featuredCourses = [
    {
      id: 1,
      title: "Advanced Physics: Mechanics & Waves",
      instructor: "Dr. Ariful Islam",
      rating: 4.9,
      students: "1.2k",
      price: "৳4,500",
      image: "https://picsum.photos/seed/physics/400/250",
      tag: "Best Seller"
    },
    {
      id: 2,
      title: "Organic Chemistry Masterclass",
      instructor: "Nabil Ahmed",
      rating: 4.8,
      students: "850",
      price: "৳3,200",
      image: "https://picsum.photos/seed/chemistry/400/250",
      tag: "New"
    },
    {
      id: 3,
      title: "Calculus III: Multivariable",
      instructor: "Sajid Hasan",
      rating: 5.0,
      students: "2.1k",
      price: "৳5,000",
      image: "https://picsum.photos/seed/math/400/250",
      tag: "Trending"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-teal-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full" />
              </div>
              <span className="text-xl font-bold tracking-tight">Harmony</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
              <a href="#" className="text-black">Courses</a>
              <a href="#" className="hover:text-black transition-colors">Mentors</a>
              <a href="#" className="hover:text-black transition-colors">Resources</a>
              <a href="#" className="hover:text-black transition-colors">Pricing</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-zinc-100 rounded-full px-4 py-2 gap-2 w-64">
              <Search size={16} className="text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-400"
              />
            </div>
            <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative">
              <Bell size={20} className="text-zinc-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 bg-zinc-200 rounded-full overflow-hidden border border-zinc-100 cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Header */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Welcome back, <span className="italic font-serif font-light">Sajedur.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl">
              Your learning journey is in perfect sync. You have 3 assignments due this week and 2 new lectures waiting.
            </p>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <BookOpen className="text-teal-600" />, label: "Courses Active", value: "12", sub: "2 completed this month" },
            { icon: <Clock className="text-blue-600" />, label: "Study Hours", value: "48.5h", sub: "+12% from last week" },
            { icon: <CheckCircle2 className="text-emerald-600" />, label: "Tasks Done", value: "85%", sub: "15 tasks remaining" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-zinc-50 rounded-lg">{stat.icon}</div>
                <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-xs font-medium text-zinc-400">{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    cat === "All" ? "bg-black text-white" : "bg-white text-zinc-500 hover:bg-zinc-100 border border-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {course.tag}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{course.rating}</span>
                  </div>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500 font-medium">{course.students} students</span>
                </div>
                <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-teal-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">{course.instructor}</p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                  <span className="text-lg font-bold">{course.price}</span>
                  <button className="flex items-center gap-1 text-sm font-bold text-black group-hover:gap-2 transition-all">
                    Enroll Now <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Access Sidebar-like section */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Unlock your full potential with <span className="text-teal-400 italic font-serif font-light">Harmony Pro.</span>
                </h2>
                <p className="text-zinc-400 mb-8 text-lg">
                  Get unlimited access to all courses, 1-on-1 mentorship, and exclusive study resources.
                </p>
                <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-teal-400 transition-colors">
                  Start Free Trial
                </button>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-3xl rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full -mr-32 -mb-32" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Up Next</h3>
            {[
              { title: "Live Q&A: Physics", time: "Today, 4:00 PM", icon: <Calendar size={18} /> },
              { title: "Chemistry Quiz", time: "Tomorrow, 10:00 AM", icon: <Layout size={18} /> },
              { title: "Math Workshop", time: "Fri, 2:00 PM", icon: <BookOpen size={18} /> }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-zinc-100 bg-white hover:border-teal-100 transition-colors cursor-pointer">
                <div className="p-2 bg-zinc-50 rounded-xl text-zinc-400">{item.icon}</div>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-zinc-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-100 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-full" />
            </div>
            <span className="font-bold tracking-tight">Harmony</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Help</a>
            <a href="#" className="hover:text-black">Contact</a>
          </div>
          <p className="text-sm text-zinc-400">© 2026 Harmony Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
