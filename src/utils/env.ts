const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
] as const;

export function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.join('\n')}\n` +
      'Please check your .env file and make sure all required variables are set.'
    );
  }
}

// Get environment variables with type safety
export function getEnvVar(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// Get public environment variables for client-side use
export function getPublicEnvVars() {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  } as const;
}
