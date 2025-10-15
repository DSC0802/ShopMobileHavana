import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Product availability',
    message: '',
    orderNumber: '',
    phone: '',
    productModel: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700', 'ease-out');
          el.classList.remove('opacity-0', 'translate-y-6');
          if (observer) observer.unobserve(el);
        }
      });
    };

    observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    const elementsToObserve = [titleRef.current, infoRef.current, formContainerRef.current];
    elementsToObserve.forEach(el => { if (el && observer) observer.observe(el); });

    return () => {
      if (observer) {
        elementsToObserve.forEach(el => { if (el) observer!.unobserve(el); });
        observer.disconnect();
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormState(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => phone.replace(/[^0-9]/g, '').length >= 7;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { name, email, subject, message, orderNumber, phone, productModel } = formState;

    if (!name || name.trim().length < 2) newErrors.name = 'Please enter your name (at least 2 characters).';
    if (!email || !validateEmail(email)) newErrors.email = 'Please enter a valid email address.';

    const allowedSubjects = ['Product availability', 'Repair / Service', 'Order / Shipping', 'Warranty', 'Other'];
    if (!subject || !allowedSubjects.includes(subject)) newErrors.subject = 'Please choose a valid reason.';

    if (!message || message.trim().length < 10) newErrors.message = 'Please provide a more detailed message (at least 10 characters).';

    if (subject === 'Order / Shipping' || subject === 'Warranty') {
      if (!orderNumber || orderNumber.trim().length < 4) newErrors.orderNumber = 'Please provide your order number (at least 4 characters).';
    }

    if (subject === 'Repair / Service') {
      if (!phone || !validatePhone(phone)) newErrors.phone = 'Please enter a valid phone number so we can contact you about repairs.';
    }

    if (subject === 'Product availability') {
      if (!productModel || productModel.trim().length < 2) newErrors.productModel = 'Please specify the product model you are asking about.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstKey = Object.keys(errors)[0];
      const el = firstKey ? formRef.current?.querySelector(`[name="${firstKey}"]`) as HTMLElement | null : null;
      if (el) el.focus();
      return;
    }

    // Submit (demo)
    console.log('Form submitted:', formState);
    setFormSubmitted(true);
    setFormState({ name: '', email: '', subject: 'Product availability', message: '', orderNumber: '', phone: '', productModel: '' });
    setErrors({});
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const { subject } = formState;

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div ref={titleRef} className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
          <SectionTitle title="Contact Us" subtitle="Questions about products, repairs or orders? We're here to help" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Info */}
          <div ref={infoRef} className="opacity-0 translate-y-6 transition-all duration-700 ease-out" style={{ transitionDelay: '100ms' }}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Visit or contact our store</h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">We sell the latest smartphones, accessories and offer professional repairs and warranty service. Contact us for stock inquiries, repairs or any support related to your device.</p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icons.Mail size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">Email</h4>
                  <a href="mailto:info@tiendamoviles.com" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@tiendamoviles.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icons.Phone size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">Phone</h4>
                  <a href="tel:+5353724241" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+53 53724241</a>
                  <div className="mt-2"><a href="https://wa.me/5353724241" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp: +53 53724241</a></div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icons.MapPin size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">Location</h4>
                  <p className="text-slate-700 dark:text-slate-300">Calle Mayor 123, 28013 Havana, Cuba</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mt-6">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icons.Clock size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">Opening Hours</h4>
                  <p className="text-slate-700 dark:text-slate-300">Mon - Fri: 10:00 — 20:00<br />Sat: 10:00 — 14:00<br />Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formContainerRef} className="opacity-0 translate-y-6 transition-all duration-700 ease-out" style={{ transitionDelay: '300ms' }}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>

              {formSubmitted && (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6 flex items-center">
                  <div className="mr-3"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                  <p>Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                    <input id="name" name="name" value={formState.name} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`} />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input id="email" name="email" type="email" value={formState.email} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`} />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason for contact</label>
                  <select id="subject" name="subject" value={formState.subject} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}>
                    <option>Product availability</option>
                    <option>Repair / Service</option>
                    <option>Order / Shipping</option>
                    <option>Warranty</option>
                    <option>Other</option>
                  </select>
                  {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
                </div>

                {/* Conditional fields */}
                {subject === 'Product availability' && (
                  <div>
                    <label htmlFor="productModel" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product model</label>
                    <input id="productModel" name="productModel" value={formState.productModel} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.productModel ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`} />
                    {errors.productModel && <p className="text-sm text-red-600 mt-1">{errors.productModel}</p>}
                  </div>
                )}

                {subject === 'Order / Shipping' || subject === 'Warranty' ? (
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Order number</label>
                    <input id="orderNumber" name="orderNumber" value={formState.orderNumber} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.orderNumber ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`} />
                    {errors.orderNumber && <p className="text-sm text-red-600 mt-1">{errors.orderNumber}</p>}
                  </div>
                ) : null}

                {subject === 'Repair / Service' && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone (for repair follow-up)</label>
                    <input id="phone" name="phone" value={formState.phone} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`} />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea id="message" name="message" rows={5} value={formState.message} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-slate-300'} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`} />
                  {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
                </div>

                <div>
                  <button type="submit" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
                    <Icons.Send size={18} className="mr-2" />
                    Send inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
