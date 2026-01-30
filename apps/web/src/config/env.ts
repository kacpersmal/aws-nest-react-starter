import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

function validateEnv() {
  const parsed = envSchema.safeParse(import.meta.env);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    throw new Error(
      `Invalid environment variables:\n${JSON.stringify(errors, null, 2)}`,
    );
  }
  return parsed.data;
}

export const env = validateEnv();
