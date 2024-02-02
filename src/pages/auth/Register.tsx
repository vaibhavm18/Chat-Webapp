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
import { registerSchema } from "@/lib/schema";
import { registerType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { signup } from "@/api";
import { setCredential } from "@/features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { authDataType } from "./Login";

const defaultValues: registerType = {
  username: "",
  password: "",
  email: "",
};

const formField = ["email", "username", "password"] as const;

export default function Register() {
  const dispatch = useDispatch();
  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (credential: registerType) => {
      return signup(credential);
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

  const onSubmit = (value: registerType) => {
    console.log(value);
    mutation.mutate(value);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-[#1e2030] text-[#BCD1EF] max-w-lg w-full border-white border shadow-blur backdrop-blur-lg py-8 px-8 rounded-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 items-center w-full"
          >
            <div className="text-center">
              <p className="text-2xl mb-2">Register</p>
              <p>
                Already have an account ?{" "}
                <span className="text-blue-500 cursor-pointer hover:underline transition-all">
                  <Link to={"/login"}>login here</Link>
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
                        type={label}
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
    </>
  );
}
