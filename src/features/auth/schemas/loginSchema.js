import z from "zod";

const loginSchema = z.object({
  email: z.email().nonempty("Please fill this field"),
  password: z.string().nonempty("Please fill this field"),
});

export default loginSchema;
