import { useForm } from "react-hook-form";

export default function Forms() {
  const { register } = useForm();
  return (
    <form>
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        required
      />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}

// Less code
// Don't deal with events
// Easier Input
// register를 통해 input과 value를 연결시켜줬다.
