import { useRef, type FormEvent } from "react";
import { Button } from "../ui/button";
import { trpc } from "../../../utils/trpc";
import { useForm, type FieldValues } from "react-hook-form";

const UserProfileForm = () => {
  const { register, handleSubmit } = useForm();

  const userProfile = trpc.userProfile.createUserProfile.useMutation();
  //   const firstNameRef = useRef<HTMLInputElement>(null);
  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-items m-4 gap-4 border-4 border-red-800"
      >
        <label htmlFor="firstName">First Name:</label>
        <input
          {...register("firstName")}
          id="firstName"
          type="text"
          //   name="firstNameInput"
        />
        <label>
          Last Name: <input name="lastNameInput" />
        </label>
        <label htmlFor="">
          Birth Date: <input type="date" name="birthDateInput" />
        </label>
        <label htmlFor="">
          Gender:
          <select name="selectGender">
            <option value="male">Male</option>
            <option value="famle">Famale</option>
          </select>
        </label>
        <label htmlFor="">
          Phone Number: <input type="number" name="phoneNumberInput" />
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default UserProfileForm;
