import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserSchema } from "../../../../packages/shared/zod/userType";

const SignUp = () => {
  const signUpForm = useForm({
    resolver: zodResolver(createUserSchema),
  });
  return <div>SignUp</div>;
};

export default SignUp;
