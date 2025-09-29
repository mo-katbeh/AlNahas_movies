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
import { trpc } from "../../../utils/trpc";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import Loader from "../loader/styled-wrapper";
const LoginForm = () => {
  const router = useRouter();
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "mohammadkatbeh12@gmail.com",
      password: "0115145090",
    },
  });
  const [error, setError] = useState<string | undefined>();

  const { isPending, mutate } = trpc.auth.login.useMutation({
    onError: () => {
      setError("Incorrect email or password");
    },
    onSuccess: () => {
      router.navigate({ to: "/" });
    },
  });
  const onSubmit = (data: LoginSchema) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };
  const onError = (errors: FieldValues) => console.log("Errpr", errors);
  // moh@gmail.com
  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm  gap-2 justify-items-center">
          <CardHeader className=" justify-items-center">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit, onError)}
                className="space-y-8 m-2"
              >
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Apple
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
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
                      <AlertTitle>{error}</AlertTitle>
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
              <Link to="/signUp" className="underline underline-offset-4">
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
