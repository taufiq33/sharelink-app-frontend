import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

export default function useRegisterForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmationPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  async function handleRegister(dataSubmitted) {
    try {
      const { data } = await register(dataSubmitted);
      navigate("/auth/login");
    } catch (error) {
      form.setError("root", { type: "manual", message: error.data.message });
    }
  }

  console.log(form.formState.errors);

  return { form, handleRegister };
}
