import UserProfileForm from "@/components/form/UserProfileForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/userProfile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserProfileForm />;
}
