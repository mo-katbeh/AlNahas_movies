import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  signUpSchema,
  type SignUpSchema,
} from "../../../../packages/shared/zod/authSchema";
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
import { Link, useRouter } from "@tanstack/react-router";
// import { useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import Loader from "../loader/styled-wrapper";

const SignUpForm = () => {
  // const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    },
  });
  const {
    // data: userInfo,
    error,
    isPending,
    mutate,
    isSuccess,
  } = trpc.auth.signup.useMutation({
    onError: (err) => {
      if (
        err.data?.code === "BAD_REQUEST" &&
        err.message.includes("User already exists")
      ) {
        console.log(err.message);
      }
    },
  });

  if (isSuccess) {
    router.navigate({ to: "/" });
  }
  // const signUpMutation = trpc.auth.signup.useMutation({
  //   onError: (err) => {
  //     if (
  //       err.data?.code === "BAD_REQUEST" &&
  //       err.message.includes("User already exists")
  //     ) {
  //       signUpForm.setError("email", {
  //         type: "value",
  //         message: "This email is already registered. Try logging in.",
  //       });
  //     }

  //     console.log("error message", err.message);
  //     // setError(err.message);
  //   },
  //   onSuccess: () => {
  //     router.navigate({ to: "/" });
  //   },
  // });

  const onSubmit = (data: SignUpSchema) => {
    mutate({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      userName: data.userName,
    });
    console.log("SUBMIT RUNNING ");
    console.log(data);
  };

  // const onError = (errors: FieldValues) => console.log("errors", errors);
  return (
    <>
      {isPending && (
        <div>
          <Loader />
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
        <Card className="w-full max-w-sm  gap-2 justify-items-center">
          <CardHeader className=" justify-items-center">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign up with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSubmit)}
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
                <div className="mb-5">
                  <Button type="submit" className="w-full text-sm">
                    Sign up
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-center text-sm gap-4">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUpForm;
