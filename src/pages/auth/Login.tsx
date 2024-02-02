import { login } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setCredential } from "@/features/auth/authSlice";
import { loginSchema } from "@/lib/schema";
import { loginType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const defaultValues: loginType = {
  username: "",
  password: "",
};

export type authDataType = {
  data: {
    _id: string;
    token: string;
    username: string;
  };
};

const formField = ["username", "password"] as const;

export default function Login() {
  const dispatch = useDispatch();
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (credential: loginType) => {
      return login(credential);
    },
    onSuccess: (data: authDataType) => {
      form.setValue("password", "");
      form.setValue("username", "");
      dispatch(setCredential(data.data));
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const e = error.response.data.message;
      toast.error(e, {
        position: "top-center",
        className: "bg-[#222436] text-white",
      });
    },
  });

  const onSubmit = (value: loginType) => {
    mutation.mutate(value);
  };

  // #222436
  // #1e2030

  return (
    <>
      <ToastContainer />
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
            <Button
              type="submit"
              className="rounded-xl"
              disabled={mutation.isPending ? true : false}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
