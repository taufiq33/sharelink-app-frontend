import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../schemas/registerSchema";
import { register } from "../api";

export default function useRegisterForm({ action }) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmationPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(dataSubmitted) {
    try {
      const { data } = await register(dataSubmitted);
      action(data);
    } catch (error) {
      form.setError("root", { type: "manual", message: error.data.message });
    }
  }

  console.log(form.formState.errors);

  return { form, handleRegister };
}
