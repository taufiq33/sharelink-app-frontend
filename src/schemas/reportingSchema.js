import z from "zod";

export const reportingSchema = z.object({
  reason: z.string().min(1, "Please select 1 reason"),
  message: z.string().optional(),
});
