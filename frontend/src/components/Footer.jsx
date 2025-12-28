import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-20 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20 transform hover:rotate-6 transition-transform">
                <span className="text-white text-2xl font-black">E</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Edu<span className="text-teal-600">ceet</span>
              </h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">
              Empowering learners worldwide with expert-led courses and a
              cutting-edge platform for career growth.
            </p>
            <button className="group flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-semibold transition-all hover:bg-teal-600 dark:hover:bg-teal-500 hover:text-white shadow-sm">
              Contact Us
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-8">
              Useful Links
            </h3>
            <ul className="space-y-4">
              {[
                "Marketplace",
                "Kindergarten",
                "University",
                "GYM Coaching",
                "Cooking",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-teal-500 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-8">
              Our Company
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Become Teacher",
                "Blog",
                "Instructor",
                "Events",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-teal-500 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-8">
              Get Contact
            </h3>
            <div className="space-y-6">
              <a
                href="tel:+911234567890"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                    Phone
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                    (+91) 123-456-789
                  </p>
                </div>
              </a>
              <a
                href="mailto:hello@educeet.com"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                    Email
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                    hello@educeet.com
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 shrink-0 transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                    Location
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                    North America, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-zinc-200 dark:border-zinc-800 gap-8">
          <div className="flex gap-4">
            {[
              {
                icon: <Facebook className="w-5 h-5" />,
                color: "hover:bg-blue-600",
              },
              {
                icon: <Twitter className="w-5 h-5" />,
                color: "hover:bg-sky-500",
              },
              {
                icon: <Instagram className="w-5 h-5" />,
                color: "hover:bg-pink-600",
              },
              {
                icon: <Linkedin className="w-5 h-5" />,
                color: "hover:bg-blue-700",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className={`w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-white transition-all hover:scale-110 shadow-sm ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Educeet. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Privacy Bar */}
      <div className="bg-zinc-100 dark:bg-zinc-900/50 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-teal-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Cookies
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>

      {/* Improved Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-2xl bg-teal-600 text-white shadow-2xl shadow-teal-600/30 flex items-center justify-center transition-all duration-300 hover:bg-teal-700 hover:-translate-y-1 active:scale-90 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 animate-pulse" />
      </button>
    </footer>
  );
};

export default Footer;
