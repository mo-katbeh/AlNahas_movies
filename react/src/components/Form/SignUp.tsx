import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import {
  signUpSchema,
  type SignUpSchema,
} from "../../../../packages/shared/zod/signUpSchema";
import { trpc } from "../../../utils/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

const SignUpForm = () => {
  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    },
  });
  const signUpMutation = trpc.auth.signup.useMutation();
  const onSubmit = (data: SignUpSchema) => {
    signUpMutation.mutate({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      userName: data.userName,
    });
    console.log("SUBMIT RUNNING ");
    console.log(data);
  };
  const onError = (errors: FieldValues) => console.log("errors", errors);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md gap-2 justify-items-center">
          <CardHeader className=" justify-items-center">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign up with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSubmit, onError)}
                className="space-y-8 m-2"
              >
                <FormField
                  control={signUpForm.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full ">
                  Sign up
                </Button>
              </form>
            </Form>
            <div className="flex flex-row justify-center pt-4">
              <p className="">
                Already have an account?
                <Button variant="link">
                  <Link to="/login">Login</Link>
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUpForm;
