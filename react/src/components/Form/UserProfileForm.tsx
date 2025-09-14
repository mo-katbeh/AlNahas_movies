import { Button } from "../ui/button";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateUserProfileInputRaw,
  createUserProfileSchema,
} from "../../../../server/src/db/zod/userProfileType";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Calendar } from "../ui/calendar";

const UserProfileForm = () => {
  const [date, setDate] = useState();
  const userProfileForm = useForm<CreateUserProfileInputRaw>({
    resolver: zodResolver(createUserProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "Male",
      phoneNumber: "",
    },
  });
  // console.log("Current form values:", watch());
  // console.log("handleSubmit ", { handleSubmit });

  const onSubmit = (data: CreateUserProfileInputRaw) => {
    console.log("SUBMIT RUNNING ");
    console.log(data);
  };
  const onError = (errors: FieldValues) => console.log("errors", errors);
  return (
    <>
      <Form {...userProfileForm}>
        <form
          onSubmit={userProfileForm.handleSubmit(onSubmit, onError)}
          className="space-y-8"
        >
          <FormField
            control={userProfileForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userProfileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userProfileForm.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl></FormControl>
                <Calendar
                  mode="single"
                  selected={date}
                  // onSelect={setDate}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userProfileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userProfileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <label htmlFor="firstName">First Name:</label>
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
        */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default UserProfileForm;
