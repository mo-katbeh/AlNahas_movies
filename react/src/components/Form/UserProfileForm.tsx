import { Button } from "../ui/button";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserProfileSchema,
  type CreateUserProfileInputRaw,
} from "../../../../packages/shared/zod/userProfileType";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { trpc } from "../../../utils/trpc";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import Loader from "../loader/styled-wrapper";
import useSheetStore from "@/state-management/useSheetStore";
import { useRouter } from "@tanstack/react-router";

const UserProfileForm = () => {
  const userProfileForm = useForm({
    resolver: zodResolver(createUserProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "Male",
      phoneNumber: "",
    },
  });
  const router = useRouter();
  const { isOpen, close } = useSheetStore();
  const userProfileMutation = trpc.userProfile.createUserProfile1.useMutation();
  // console.log("Current form values:", watch());
  // console.log("handleSubmit ", { handleSubmit });

  const onSubmit = (data: CreateUserProfileInputRaw) => {
    userProfileMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
    });
    console.log("SUBMIT RUNNING ");
    console.log(data);
  };
  const onError = (errors: FieldValues) => console.log("errors", errors);
  return (
    <>
      {userProfileMutation.isPending && (
        <div>
          <Loader />
        </div>
      )}
      <Sheet open={isOpen} onOpenChange={(open) => (open ? null : close)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Add or Update your profile here. Click save when you're done
            </SheetDescription>
          </SheetHeader>
          <Form {...userProfileForm}>
            <form
              onSubmit={userProfileForm.handleSubmit(onSubmit, onError)}
              className="space-y-8 m-4"
            >
              <FormField
                control={userProfileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                      <Input type="text" {...field} />
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[250px] pl-3 text-lg font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString().split("T")[0])
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userProfileForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select your gender" />
                          <SelectContent position="popper">
                            <SelectItem className="bg-input" value="Male">
                              Male
                            </SelectItem>
                            <SelectItem className="bg-input " value="Female">
                              Female
                            </SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userProfileForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col justify-center">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
          <div className="flex flex-row w-full justify-center">
            <SheetClose asChild>
              <Button
                onClick={() => {
                  router.history.back();
                  close();
                }}
                type="button"
                variant="destructive"
                className="w-25"
              >
                Close
              </Button>
            </SheetClose>
          </div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserProfileForm;
