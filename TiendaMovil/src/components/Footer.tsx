import type { FC } from "react";
import { Github, Heart, Phone } from "lucide-react";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <a href="#home" className="text-xl font-bold text-slate-900 dark:text-white">
              T`Mobile<span className="text-blue-600 dark:text-blue-400">Havana</span>
            </a>
            <p className="text-slate-300 mb-6 max-w-md">
              Visit our store or contact us — we’ll check stock, provide a free
              diagnosis, and advise the best options for your needs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/DSC080208"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Github size={20} className="text-slate-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/yorgialejandro?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BV5OJMV9gTv627IFbOlWtaQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >

                <Phone size={20} className="text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#stock"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Stock
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contact us
                </a>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-slate-300">
                <span className="block">Havana, Cuba</span>
              </li>
              <li>
                <a
                  href="sueirodaniel04@gmail.com"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  sueirodaniel04@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+53 53724241"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  +53 53724241
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} T`Mobile<span className="text-blue-400">Havana</span>.
            All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> and
            Swift
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
