import React, { useEffect, useRef } from "react";
import { Smartphone, Globe, Phone, Heart } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add(
            "opacity-100",
            "translate-y-0",
            "transition-all",
            "duration-700",
            "ease-out"
          );
          el.classList.remove("opacity-0", "translate-y-6");
          if (observer) observer.unobserve(el);
        }
      });
    };

    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    const elementsToObserve = [
      titleRef.current,
      imageRef.current,
      contentRef.current,
      statsRef.current,
    ];
    elementsToObserve.forEach((el) => {
      if (el && observer) observer.observe(el);
    });

    return () => {
      if (observer) {
        elementsToObserve.forEach((el) => {
          if (el && observer) observer.unobserve(el);
        });
        observer.disconnect();
      }
    };
  }, []);

  const stats = [
    { id: 1, icon: <Smartphone size={24} />, value: "120+", label: "Phones in stock" },
    { id: 2, icon: <Globe size={24} />, value: "10+", label: "Years in business" },
    { id: 3, icon: <Phone size={24} />, value: "8k+", label: "Repairs completed" },
    { id: 4, icon: <Heart size={24} />, value: "9.8/10", label: "Satisfied customers" },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-slate-900"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={titleRef}
          className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <SectionTitle
            title="About Our Store"
            subtitle="Quality phones, fast repairs and friendly service"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16">
          {/* Store Image */}
          <div
            ref={imageRef}
            className="lg:col-span-2 opacity-0 translate-y-6 transition-all duration-700 ease-out"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square max-w-md mx-auto">
              <img
                src="/src/assets/phone-hero.jpg"
                alt="Phones"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent" />
            </div>
          </div>

          {/* Store Content */}
          <div
            ref={contentRef}
            className="lg:col-span-3 flex flex-col space-y-6 opacity-0 translate-y-6 transition-all duration-700 ease-out"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                We are a family-run mobile store offering the latest smartphones,
                certified pre-owned devices, accessories and a fast, reliable repair
                service. Our team has helped thousands of customers find the right
                phone and get devices fixed the same day.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                We buy, sell and trade devices, provide warranty repairs and offer
                technical support. Whether you need a new phone, a battery
                replacement, or help transferring your data, our certified
                technicians will assist you with friendly, transparent pricing.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Visit our store or contact us — we’ll check stock, provide a free
                diagnosis, and advise the best options for your needs.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#stock"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Browse stock
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-24 opacity-0 translate-y-6 transition-all duration-700 ease-out"
          style={{ transitionDelay: "400ms" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
