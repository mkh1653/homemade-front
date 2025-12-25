"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, Login } from "@/src/lib/schemas/login";
import { useMutation } from "@tanstack/react-query";
import { serverFetch } from "@/src/lib/serverApi";

const loginAction = async (data: object) => {
  return await serverFetch("/auth/supporter/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (data) => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: Login) => {
    mutation.mutate(data);
  };

  return (
    <div className='w-dvw h-dvh flex justify-center items-center bg-base-100'>
      <div className='card bg-base-300 text-base-content min-w-1/3 min-h-1/2 shadow-2xl'>
        <div className='card-body'>
          <h1 className='text-4xl font-bold text-center mb-9'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='fieldset mb-3 justify-center'>
              <label className='label'>نام کاربری</label>
              <input
                type='text'
                className='input w-full mb-1'
                {...register("email")}
              />
              {errors.email && (
                <span className='text-error text-xs'>
                  {errors.email.message}
                </span>
              )}
            </fieldset>
            <fieldset className='fieldset mb-3'>
              <label className='label'>رمزعبور</label>
              <input
                type='password'
                className='input w-full mb-1'
                {...register("password")}
              />
              {errors.password && (
                <span className='text-error text-xs'>
                  {errors.password.message}
                </span>
              )}
            </fieldset>
            <div className='flex justify-center mt-6'>
              <button
                className='btn btn-wide btn-primary rounded-xl'
                type='submit'
                disabled={mutation.isPending}>
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
