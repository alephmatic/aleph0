import { z } from "zod";

// define zod schema
export const userProfileBody = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  city: z.enum(["London", "New York", "Tokyo"]),
});
export type UserProfileBody = z.infer<typeof userProfileBody>;
