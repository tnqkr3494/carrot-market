import Button from "@/components/button";
import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  email: string;
}

interface ISignUpResponse {
  ok: boolean;
  error?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const [signUp, { loading, data }] =
    useMutation<ISignUpResponse>("/api/users/signup");
  const router = useRouter();
  const onValid = (data: LoginForm) => {
    if (loading) return;
    signUp(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/enter");
    }
  }, [data?.ok]);

  return (
    <div className="absolute left-1/2 top-1/2 h-1/2 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-md border-2 border-orange-500 p-5">
      <h3 className="text-center text-xl font-bold">Sign Up</h3>
      <form
        className="flex h-full flex-col justify-around"
        onSubmit={handleSubmit(onValid)}
      >
        <div className="flex flex-col space-y-3">
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                message: "The username should be longer than 5 chars.",
                value: 5,
              },
            })}
            type="text"
            placeholder="Username"
          />
          <input
            {...register("email", {
              required: "Email is required",
              validate: {
                notGmail: (value) =>
                  !value.includes("@gmail.com") || "Gmail is not allowed",
              },
            })}
            type="email"
            placeholder="Email"
          />
        </div>
        {errors.email?.message}
        {errors.username?.message}
        {data?.error ? data.error : null}
        <Button text={loading ? "Loading..." : "SignUp"} large />
      </form>
    </div>
  );
}

// Less code
// Don't deal with events
// Easier Input
// register를 통해 input과 value를 연결시켜줬다.
