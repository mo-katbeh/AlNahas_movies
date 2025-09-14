import { Button } from "../ui/button";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  // type CreateUserProfileInput,
  type CreateUserProfileInputRaw,
  createUserProfileSchema,
} from "../../../../server/src/db/zod/userProfileType";

const UserProfileForm = () => {
  const {
    // watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserProfileInputRaw>({
    resolver: zodResolver(createUserProfileSchema),
  });
  // console.log("Current form values:", watch());
  // console.log("handleSubmit ", { handleSubmit });

  const onSubmit = (data: FieldValues) => {
    console.log("SUBMIT RUNNING ");
    console.log(data);
  };
  const onError = (errors: FieldValues) => console.log("errors", errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col justify-items m-4 gap-4 border-4 border-red-800"
    >
      <label htmlFor="firstName">First Name:</label>
      <input {...register("firstName")} id="firstName" type="text" />
      {errors.firstName && <p> {errors.firstName.message} </p>}
      <label htmlFor="lastName">Last Name:</label>
      <input {...register("lastName")} id="lastName" type="text" />
      {errors.lastName && <p> {errors.lastName.message} </p>}
      <label htmlFor="birthDate">
        Birth Date:
        <input {...register("birthDate")} id="birthDate" type="date" />
        {errors.birthDate && <p> {errors.birthDate.message} </p>}
      </label>
      <label htmlFor="">
        Gender:
        <select id="gender" {...register("gender")}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <p> {errors.gender.message} </p>}
      </label>
      <label htmlFor="">Phone Number:</label>
      <input {...register("phoneNumber")} type="text" />
      {errors.phoneNumber && <p> {errors.phoneNumber.message} </p>}
      <Button type="submit" onClick={() => onSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default UserProfileForm;
