import SignUp from "@/components/form/SignUp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signUp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}
