declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site Configuration
      NEXT_PUBLIC_SITE_URL: string;
      
      // Email Service
      RESEND_API_KEY: string;
      
      // SEO
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: string;

      // Environment
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}
