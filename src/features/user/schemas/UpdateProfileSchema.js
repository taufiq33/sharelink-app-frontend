import z from "zod";

export const MAX_SIZE = 1024 * 1024 * 3;
export const ALLOWED_IMAGE_TYPE = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const updateProfileSchema = z.object({
  photoProfile: z
    .any()
    .optional()

    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file?.[0]?.size < MAX_SIZE, "Maximum size is 3MB";
    })
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return (
        ALLOWED_IMAGE_TYPE.includes(file?.[0]?.type),
        `Allowed file extension is ${ALLOWED_IMAGE_TYPE.join(", ")}`
      );
    }),
  email: z.email(),
  username: z
    .string()
    .min(4, "username must be 4 character minimum")
    .max(15, "username must be 15 character maximum"),
  shortBio: z.string(),
});
export default updateProfileSchema;
