import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2, XCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateForm = (data: { name: string; email: string; message: string }): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }
  
  return errors;
};

export const Contact: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:${portfolioData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    await new Promise(resolve => setTimeout(resolve, 1000));

    window.location.href = mailtoLink;
    
    setStatus('success');
    setStatusMessage('Opening your email client...');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setTouched({});
    
    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    const fieldErrors = validateForm({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: fieldErrors[e.target.name as keyof FormErrors] }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/vijayaraj-v', href: portfolioData.linkedin },
    { icon: Github, label: 'GitHub', value: 'github.com/vijay261918-gif', href: portfolioData.github },
    { icon: MapPin, label: 'Location', value: portfolioData.location, href: null },
    { icon: Phone, label: 'Phone', value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
  ];

  return (
    <section id="contact" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            Contact
          </span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mt-4">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <GlassCard hover className="p-6 h-full">
              <h3 className="text-xl font-semibold text-text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-5 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-text-secondary hover:text-accent-cyan transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-bg-border">
                <h4 className="font-medium text-text-primary mb-4">Availability</h4>
                <div className="space-y-2">
                  {[
                    'Open to full-time opportunities',
                    'Available for internships',
                    'Open to freelance projects',
                    'Open to collaboration',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-teal" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-text-primary mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`input-field ${errors.name && touched.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      placeholder="Your name"
                      disabled={status === 'submitting'}
                      aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                    />
                    {errors.name && touched.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5"
                        role="alert"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`input-field ${errors.email && touched.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      placeholder="your@email.com"
                      disabled={status === 'submitting'}
                      aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                    />
                    {errors.email && touched.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5"
                        role="alert"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows={5}
                    className={`input-field resize-none ${errors.message && touched.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="Tell me about your project, opportunity, or just say hi..."
                    disabled={status === 'submitting'}
                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                  />
                  {errors.message && touched.message && (
                    <motion.p
                      id="message-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5"
                      role="alert"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  rightIcon={status === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  disabled={status === 'submitting'}
                  fullWidth={false}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-accent-teal/10 border border-accent-teal/30 text-accent-teal"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{statusMessage}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{statusMessage || 'Something went wrong. Please try again.'}</span>
                  </motion.div>
                )}

                <p className="text-xs text-text-muted text-center">
                  This will open your default email client with the message pre-filled.
                </p>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;