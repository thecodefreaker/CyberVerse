import { FloatingContact } from '@/types';

export const contactData: FloatingContact = {
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/yourusername',
      fetchLive: true
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      fetchLive: false
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/yourusername',
      fetchLive: true
    }
  ],
  email: 'your.email@example.com',
  phone: '+1234567890',
  message: 'Available for cybersecurity consulting, penetration testing, and security training. Feel free to reach out!'
};
