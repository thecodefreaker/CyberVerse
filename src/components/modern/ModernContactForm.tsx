import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaLock } from 'react-icons/fa';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ModernContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="modern-card p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-center">
        <motion.div
          className="w-10 h-10 rounded-full bg-dark-secondary flex items-center justify-center mr-3"
          animate={{ 
            boxShadow: ['0 0 0 rgba(80, 250, 123, 0.4)', '0 0 20px rgba(80, 250, 123, 0.6)', '0 0 0 rgba(80, 250, 123, 0.4)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaLock className="text-neon-green" />
        </motion.div>
        <h2 className="text-xl font-cyber">Secure Contact</h2>
      </div>
      
      {submitted ? (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto bg-neon-green/20 rounded-full flex items-center justify-center mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FaPaperPlane className="text-neon-green text-xl" />
          </motion.div>
          <h3 className="text-lg font-medium mb-2">Message Sent!</h3>
          <p className="opacity-70">Thanks for reaching out. I'll get back to you soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="modern-form-control">
            <label className="modern-form-label">Name</label>
            <motion.input
              type="text"
              name="name"
              className="modern-input"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#50fa7b', boxShadow: '0 0 10px rgba(80, 250, 123, 0.3)' }}
            />
          </div>
          
          <div className="modern-form-control">
            <label className="modern-form-label">Email</label>
            <motion.input
              type="email"
              name="email"
              className="modern-input"
              placeholder="Your email"
              value={formState.email}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#50fa7b', boxShadow: '0 0 10px rgba(80, 250, 123, 0.3)' }}
            />
          </div>
          
          <div className="modern-form-control">
            <label className="modern-form-label">Message</label>
            <motion.textarea
              name="message"
              className="modern-input min-h-[120px] resize-none"
              placeholder="Your message"
              value={formState.message}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#50fa7b', boxShadow: '0 0 10px rgba(80, 250, 123, 0.3)' }}
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          
          <motion.button
            type="submit"
            className="modern-button modern-button-primary w-full py-3 mt-2"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FaPaperPlane className="mr-2" /> Send Message
              </span>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ModernContactForm;
