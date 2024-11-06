import { z } from "zod";

export const InfluencerSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  state: z.string().min(1, "State is required"),
  password: z.string().optional(),
  code: z.string().min(1, "Invitation code is required"),
});

export type InfluencerType = z.infer<typeof InfluencerSchema>;
