import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  signUpSchema,
  type SignUpSchema,
} from "../../../../packages/shared/zod/signUpSchema";
import { authClient } from "../../../utils/auth-client";
import { trpc } from "../../../utils/trpc";

const signUpUser = async (data: SignUpSchema) => {
  const { error } = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.userName,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const signup = trpc.auth.signup.useMutation();
const SignUp = () => {
  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
  });

  return;
};

export default SignUp;
