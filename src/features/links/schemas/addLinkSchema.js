import z from "zod";

export const addLinkSchema = z.object({
  label: z.string().trim().nonempty("label is required"),
  link: z.url(),
});
