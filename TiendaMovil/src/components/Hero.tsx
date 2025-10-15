import { useEffect, useRef, type FC, type ReactNode } from 'react';
import { ArrowDown, Github } from 'lucide-react';
import PhoneHero from '../assets/phone-hero.jpg';
const LinkButton: FC<{
  href: string;
  primary?: boolean;
  children: ReactNode;
}> = ({ href, primary, children }) => (
  <a
    href={href}
    className={`inline-block text-center px-5 py-3 rounded-md font-medium shadow-sm ${primary
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
      }`}
  >
    {children}
  </a>
);


const Hero: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.remove('opacity-0', 'translate-y-6');
          target.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700', 'ease-out');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center pt-16 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-indigo-100 dark:bg-indigo-900/20 blur-3xl"></div>
      </div>

      {/* Content  */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 md:px-6 z-10 opacity-0 translate-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-2">
              Mobile Store
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Best deals on <span className="text-blue-600 dark:text-blue-400">smartphones</span> and accessories
            </h1>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-slate-900 dark:text-slate-100">
                Discover the latest phones, professional repairs and high-quality accessories. Fast service, warranty on parts and helpful personalized advice.
              </p>
              <p className="text-lg md:text-xl text-slate-900 dark:text-slate-100">
                Visit our store or contact us to check availability and financing options.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <LinkButton href="#stock" primary>
                View Stock
              </LinkButton>
              <LinkButton href="#contact">
                Contact Us
              </LinkButton>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <div className="flex space-x-4">
                <a href="https://github.com/DSC0802" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                  <Github size={20} className="text-slate-700 dark:text-slate-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={PhoneHero}
                alt="Smartphone hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#stock" className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center">
            <ArrowDown size={20} className="text-blue-600 dark:text-blue-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
