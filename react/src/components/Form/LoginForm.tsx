import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@tanstack/react-router";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchema,
} from "../../../../packages/shared/zod/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import Loader from "../loader/styled-wrapper";
import { authClient } from "../../../utils/auth-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const logIn = async (data: LoginSchema) => {
  const { error, data: response } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return response;
};
const signInWithGoogle = async () => {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/movies",
  });

  if (error) {
    throw new Error(error.message);
  }
};
const LoginForm = () => {
  const router = useRouter();
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "mohammadkatbeh12@gmail.com",
      password: "0115145090",
    },
  });

  const { isPending, mutate, error } = useMutation({
    mutationKey: ["auth", "log-in"],
    mutationFn: logIn,
    onSuccess: (response) => {
      console.log("onSuccess", response.user);
      toast.success(`Welcome back ${response.user.name}`);
      router.navigate({ to: "/" });
    },
  });
  const googleSignInMutation = useMutation({
    mutationKey: ["auth", "google"],
    mutationFn: () => signInWithGoogle(),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(`Welcome back `);
      router.navigate({ to: "/" });
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutate({
      email: data.email,
      password: data.password,
    });
    console.log("SUBMIT RUNNING ");
    console.log(data);
  };
  const onError = (errors: FieldValues) => console.log("Errpr", errors);

  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm  gap-2 justify-items-center">
          <CardHeader className=" justify-items-center">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit, onError)}
                className="space-y-8 m-2"
              >
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => googleSignInMutation.mutate()}
                    className="w-full text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                {error && (
                  // <div className="w-full p-6 flex justify-center items-center">
                  <div className="w-full max-w-sm">
                    <Alert
                      variant="destructive"
                      className="justify-center items-center  bg-red-600/90 text-white "
                    >
                      <AlertCircleIcon />
                      <AlertTitle>{error.message}</AlertTitle>
                    </Alert>
                  </div>
                  // </div>
                )}
                <FormField
                  control={loginForm.control}
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
                  control={loginForm.control}
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

                <div className="mb-5">
                  <Button type="submit" className="w-full text-sm">
                    Login
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default LoginForm;
