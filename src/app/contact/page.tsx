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
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-sm font-mono text-gray-400">
                contact.config.ts
              </div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50 mb-6">
                Let's Connect
              </h1>
              <p className="text-gray-400 text-lg">
                Have a project in mind or want to discuss tech? I'd love to hear from you.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative group mb-8">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                <div className="backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
                    <div className="flex items-center gap-2 text-primary font-mono">
                      <span className="text-sm">class</span>
                      <span className="text-white">ContactMethods</span>
                      <span className="text-primary/70">{" {"}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ContactMethods />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="relative group">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                <div className="p-6 backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-mono mb-4">
                    <span className="text-sm">function</span>
                    <span className="text-white">getInfo</span>
                    <span className="text-primary/70">( )</span>
                    <span className="text-primary/70">{" {"}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed pl-4 border-l border-primary/10">
                    I'm always interested in hearing about new projects and opportunities. 
                    Whether you have a question or just want to say hi, I'll try my best 
                    to get back to you!
                  </p>
                  <div className="text-primary/70 font-mono mt-4">{"}"}</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact Form Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative group">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
              <div className="backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-mono">
                    <span className="text-sm">async function</span>
                    <span className="text-white">sendMessage</span>
                    <span className="text-primary/70">( )</span>
                    <span className="text-primary/70">{" {"}</span>
                  </div>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        <span className="text-primary">const</span> name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-primary/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-all duration-300"
                          placeholder="Your name"
                        />
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70" />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        <span className="text-primary">const</span> email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-primary/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70" />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        <span className="text-primary">const</span> message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-primary/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-all duration-300"
                          placeholder="Your message here..."
                        />
                        <FiMessageSquare className="absolute left-3 top-4 text-primary/70" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <span className="font-mono">await sending()...</span>
                      ) : (
                        <>
                          <span className="font-mono">await send()</span>
                          <FiSend className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-mono"
                      >
                        <span className="text-green-500">return</span> "Message sent successfully!"
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-mono"
                      >
                        <span className="text-red-500">throw new Error</span>("Failed to send message")
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
