import { createGroup } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { singleGroup } from "@/features/group/groupSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const groupSchema = z.object({
  group_name: z
    .string({ required_error: "Group name is required" })
    .min(5, "Group name should be 5 or more characters")
    .max(10, "Group name should be 10 or less characters"),
  category: z
    .string({ required_error: "Category is required" })
    .min(6, "Category should be 6 or more characters")
    .max(20, "Category should be 20 or less characters"),
});

export type groupType = z.infer<typeof groupSchema>;

const defaultValues = {
  group_name: "",
  category: "",
};

const formField = ["group_name", "category"] as const;

export default function NewGroup() {
  const dispatch = useDispatch();
  const form = useForm<groupType>({
    resolver: zodResolver(groupSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (credential: groupType) => {
      return createGroup(credential);
    },
    onSuccess: (data) => {
      form.setValue("category", "");
      form.setValue("group_name", "");
      dispatch(singleGroup(data.data.data));
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const e = error.response.data.message;
      toast.error(e, {
        position: "top-center",
        className: "bg-[#222436] text-white",
      });
    },
  });

  const onSubmit = (value: groupType) => {
    mutation.mutateAsync(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-xl text-lg bg-gray-400 hover:bg-gray-300 text-black">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-[#1e2030]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 items-center w-full"
          >
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
              className="rounded-xl text-lg bg-gray-400 hover:bg-gray-300 text-black"
            >
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
