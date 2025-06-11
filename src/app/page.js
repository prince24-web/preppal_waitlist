'use client'
import React, { useState, useCallback, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Zap, 
  Brain, 
  BookOpen, 
  Target, 
  Sparkles,
  Mail,
  User,
  Clock,
  Gift,
  Users,
  Shield,
  Moon,
  Sun,
  Instagram,
  Twitter,
  MessageCircle
} from "lucide-react";
import WaitlistForm from "./components/form";

export default function PrepPalWaitlist() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [sparklePositions, setSparklePositions] = useState([]);

  // Fix hydration mismatch by ensuring client-only rendering for random elements
  useEffect(() => {
    setIsClient(true);
    // Generate sparkle positions once on client side
    const positions = [...Array(12)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 8,
      animationDuration: 3 + Math.random() * 4
    }));
    setSparklePositions(positions);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (email && name) {
      setShowThankYou(true);
      // Here you would typically send the data to your backend
      console.log("Waitlist signup:", { email, name });
      setTimeout(() => {
        setShowThankYou(false);
        setEmail("");
        setName("");
      }, 3000);
    }
  }, [email, name]);

  const themeClasses = darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-800/50' : 'bg-white/90';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`relative overflow-hidden min-h-screen transition-all duration-500 ${themeClasses}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-sm border transition-all hover:scale-110 ${
          darkMode 
            ? 'bg-gray-800/80 border-gray-600 text-yellow-400 hover:bg-gray-700/80' 
            : 'bg-white/80 border-gray-200 text-gray-600 hover:bg-white'
        }`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Thank You Toast */}
      {showThankYou && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Welcome to the waitlist! 🎉</span>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Orbs */}
        <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full animate-pulse ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10' 
            : 'bg-gradient-to-r from-blue-400/15 to-indigo-400/15'
        }`}></div>
        <div className={`absolute top-1/3 -right-48 w-80 h-80 rounded-full animate-bounce ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-500/8 to-pink-500/8' 
            : 'bg-gradient-to-r from-purple-400/10 to-pink-400/10'
        }`} style={{animationDuration: '6s'}}></div>
        
        {/* Floating Brand Icons */}
        <div className="absolute top-16 left-1/5 animate-float">
          <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg ${
            darkMode ? 'opacity-30' : 'opacity-20'
          }`}>
            <Brain className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-1/4 animate-float" style={{animationDelay: '1.5s'}}>
          <div className={`w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center ${
            darkMode ? 'opacity-35' : 'opacity-25'
          }`}>
            <BookOpen className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Sparkle Particles - Only render on client side */}
        {isClient && (
          <div className="absolute inset-0">
            {sparklePositions.map((sparkle, i) => (
              <div
                key={i}
                className="absolute animate-sparkle"
                style={{
                  left: `${sparkle.left}%`,
                  top: `${sparkle.top}%`,
                  animationDelay: `${sparkle.animationDelay}s`,
                  animationDuration: `${sparkle.animationDuration}s`
                }}
              >
                <div className={`w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full ${
                  darkMode ? 'opacity-40' : 'opacity-60'
                }`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="mb-8 animate-fade-in-up">
            <h1 className={`text-6xl lg:text-7xl font-bold ${textPrimary} leading-tight mb-4`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient">
                PrepPal
              </span>
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
              Ace your studies with AI-powered summaries, flashcards & quizzes
            </p>
            <p className={`text-xl ${textSecondary} max-w-2xl mx-auto leading-relaxed`}>
              Transform your textbooks and PDFs into personalized study materials instantly. 
              Join thousands of students already on the waitlist for early access.
            </p>
          </div>

          {/* Waitlist Form */}
          <WaitlistForm/>
          {/* Social Links */}
          <div className="flex justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <a href="#" className={`p-3 ${cardBg} backdrop-blur-sm rounded-xl ${borderColor} border hover:scale-110 transition-all hover:shadow-lg`}>
              <Instagram className="w-5 h-5 text-pink-500" />
            </a>
            <a href="#" className={`p-3 ${cardBg} backdrop-blur-sm rounded-xl ${borderColor} border hover:scale-110 transition-all hover:shadow-lg`}>
              <Twitter className="w-5 h-5 text-blue-500" />
            </a>
            <a href="#" className={`p-3 ${cardBg} backdrop-blur-sm rounded-xl ${borderColor} border hover:scale-110 transition-all hover:shadow-lg`}>
              <MessageCircle className="w-5 h-5 text-indigo-500" />
            </a>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="mb-20">
          <h2 className={`text-4xl font-bold ${textPrimary} text-center mb-12 animate-fade-in-up`}>
            Why Join the Waitlist?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Early Access", desc: "Be the first to use PrepPal before public launch", color: "from-blue-500 to-cyan-500" },
              { icon: Gift, title: "Exclusive Perks", desc: "Get premium features free for 3 months", color: "from-purple-500 to-pink-500" },
              { icon: Users, title: "Beta Tester", desc: "Shape the future of PrepPal with your feedback", color: "from-green-500 to-emerald-500" }
            ].map((benefit, i) => (
              <div key={i} className={`p-6 ${cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${borderColor} hover:shadow-xl transform hover:-translate-y-2 transition-all animate-fade-in-up`} style={{animationDelay: `${0.2 * i}s`}}>
                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>{benefit.title}</h3>
                <p className={textSecondary}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className={`text-4xl font-bold ${textPrimary} text-center mb-12 animate-fade-in-up`}>
            What's Coming to PrepPal
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "AI Summaries", desc: "Get key points from any document instantly", color: "from-blue-500 to-indigo-500" },
              { icon: Target, title: "Smart Quizzes", desc: "Auto-generated questions based on your content", color: "from-purple-500 to-pink-500" },
              { icon: BookOpen, title: "Flashcards", desc: "Create and study flashcards automatically", color: "from-green-500 to-emerald-500" },
              { icon: Zap, title: "Lightning Fast", desc: "Process documents in seconds, not minutes", color: "from-yellow-500 to-orange-500" }
            ].map((feature, i) => (
              <div key={i} className={`p-6 ${cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${borderColor} hover:shadow-xl transform hover:-translate-y-2 transition-all animate-fade-in-up`} style={{animationDelay: `${0.1 * i}s`}}>
                <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>{feature.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className={`text-4xl font-bold ${textPrimary} text-center mb-12 animate-fade-in-up`}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "When will PrepPal launch?", a: "We're targeting a launch in early 2025. Waitlist members will get 2 weeks early access!" },
              { q: "Is PrepPal free to use?", a: "We'll have both free and premium tiers. Waitlist members get 3 months of premium features free." },
              { q: "What file formats do you support?", a: "We support PDF, DOCX, TXT, and many other popular document formats." },
              { q: "How accurate are the AI summaries?", a: "Our AI achieves 95%+ accuracy in extracting key concepts and maintaining context." }
            ].map((faq, i) => (
              <div key={i} className={`p-6 ${cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${borderColor} animate-fade-in-up`} style={{animationDelay: `${0.1 * i}s`}}>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>{faq.q}</h3>
                <p className={textSecondary}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center">
          <div className={`p-8 ${cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${borderColor} animate-fade-in-up`}>
            <h3 className={`text-2xl font-bold ${textPrimary} mb-4`}>Ready to transform your studies?</h3>
            <p className={`${textSecondary} mb-6`}>Join 2,847 students already on the waitlist</p>
            <div className="flex justify-center gap-4">
              <div className={`px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                <span className={`text-sm ${textSecondary}`}>© 2025 PrepPal. All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-down {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
          }
        }
        
        @keyframes button-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
        
        .animate-sparkle {
          animation: sparkle 4s ease-in-out infinite;
        }
        
        .animate-button-glow {
          animation: button-glow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}