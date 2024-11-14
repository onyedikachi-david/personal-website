'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';
import ContactMethods from '@/components/ContactMethods';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900/20 to-gray-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#80808012_1px,transparent_1px),linear-gradient(to_bottom,_#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <main className="container mx-auto px-4 py-24 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block mb-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
                Let's Connect
              </h1>
              <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-gray-500/10 via-gray-400/10 to-gray-500/10 blur-xl opacity-50" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Have a project in mind or want to discuss tech? I'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Methods Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-8">
                  Connect With Me
                </h2>
                <ContactMethods />
                
                {/* Additional Info */}
                <div className="mt-8 p-6 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-800/50">
                  <p className="text-gray-400 leading-relaxed">
                    I'm always interested in hearing about new projects and opportunities. 
                    Whether you have a question or just want to say hi, I'll try my best 
                    to get back to you!
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Contact Form Section */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-8">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your message here..."
                    />
                    <FiMessageSquare className="absolute left-3 top-4 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <FiSend className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"
                  >
                    Failed to send message. Please try again later.
                  </motion.div>
                )}
              </form>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
