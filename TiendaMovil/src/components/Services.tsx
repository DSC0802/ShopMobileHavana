import { useEffect, useRef, type FC } from 'react';
import { Smartphone, Settings, Globe } from 'lucide-react';

const servicesData = [
  {
    icon: <Smartphone size={40} className="text-blue-500" />,
    title: 'Mobile Sales',
    description: 'New and refurbished phones (iPhone, Android). Personalized advice and financing options available.',
  },
  {
    icon: <Settings size={40} className="text-green-500" />,
    title: 'Repairs & Maintenance',
    description: 'Screen replacement, battery replacement, port repair, diagnostics and maintenance with quality parts and warranty.',
  },
  {
    icon: <Globe size={40} className="text-yellow-500" />,
    title: 'Accessories & Setup',
    description: 'Cases, chargers, headphones, screen protectors, and account setup, backups and network configuration.',
  },
];

const Services: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.remove('opacity-0', 'translate-y-6')
          el.classList.add('opacity-100', 'translate-y-0')
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    itemsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      itemsRef.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-slate-800 text-white" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 transition-opacity duration-700 ease-out" style={{ transitionDelay: '100ms' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-2">
            SERVICES
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Mobile services: sales, repairs & accessories
          </h2>
          <p className="mt-3 text-slate-300">Personalized service, quality parts and warranty on all repairs.</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el }}
              className="text-center px-6 py-8 opacity-0 translate-y-6 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
