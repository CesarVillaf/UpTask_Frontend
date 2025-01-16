import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@components/ErrorMessage";
import { login } from "@api/AuthAPI";
import { UserLoginForm } from "@types";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: login,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate('/')
    }
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-center text-white">
        Iniciar Sesión
      </h1>
      <p className="text-2xl text-center font-light text-white mt-5">
        Comienza a planear tus proyectos {""}
        <span className=" text-fuchsia-500 font-bold">iniciando sesión en este formulario</span>
      </p>
      
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
         <Link
            to={'/auth/register'}
            className="text-center text-gray-300 font-normal"
         >¿No tienes cuenta? Crear una
         </Link>

         <Link
            to={'/auth/forgot-password'}
            className="text-center text-gray-300 font-normal"
         >¿Olvidaste tu contraseña? Restablecer
         </Link>
      </nav>
    </>
  );
}
