import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginType } from "@/lib/types";
import { loginSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const defaultValues: loginType = {
  username: "",
  password: "",
};

const formField = ["username", "password"] as const;

export default function Login() {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (credential: loginType) => {
      return login(credential);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (value: loginType) => {
    console.log(value);
    mutation.mutate(value);
  };

  // #222436
  // #1e2030

  return (
    <div className="bg-[#1e2030] text-[#BCD1EF]  max-w-lg w-full border-white border shadow-blur backdrop-blur-lg py-8 px-8 rounded-3xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 items-center w-full"
        >
          <div className="text-center">
            <p className="text-2xl mb-2">Login</p>
            <p>
              Don't have an account ?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline transition-all">
                <Link to={"/register"}>register here</Link>
              </span>{" "}
            </p>
          </div>

          {formField.map((label) => (
            <FormField
              key={label}
              control={form.control}
              name={label}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg">{label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={label + "..."}
                      {...field}
                      className="rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="rounded-xl">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
