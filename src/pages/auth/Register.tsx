import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerType } from '@/lib/types';
import { registerSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const defaultValues: registerType = {
  username: '',
  password: '',
  name: '',
};

const formField = ['name', 'username', 'password'] as const;

export default function Register() {
  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (value: registerType) => {
    console.log(value);
  };

  return (
    <div className="max-w-lg w-full bg-transparent border-white border shadow-blur backdrop-blur-lg py-8 px-8 rounded-3xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 items-center w-full"
        >
          <div className="text-center">
            <p className="text-2xl mb-2">Register</p>
            <p>
              Already have an account ?{' '}
              <span className="text-blue-500 cursor-pointer hover:underline transition-all">
                login here
              </span>{' '}
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
                      placeholder={label + '...'}
                      {...field}
                      className=""
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
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
