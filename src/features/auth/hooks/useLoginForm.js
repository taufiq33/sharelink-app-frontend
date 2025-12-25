import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../api";
import { authActions } from "../slices";

export default function useLoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(dataSubmitted) {
    try {
      const { data } = await login(dataSubmitted.email, dataSubmitted.password);
      dispatch(
        authActions.saveLoginData({
          userId: data.user.id,
          email: data.user.email,
          role: data.user.role,
          username: data.user.username,
          accessToken: data.accessToken,
        })
      );
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      form.setError("root", { type: "manual", message: error.data.message });
    }
  }

  console.log(form.formState.errors);

  return { form, handleLogin };
}
