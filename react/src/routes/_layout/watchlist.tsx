import WatchListItem from "@/components/WatchListItem";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getUserSession } from "../../../utils/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const Route = createFileRoute("/_layout/watchlist")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUserSession();
    return { isAuthenticated: session?.isAuthenticated || false };
  },
});
function RouteComponent() {
  const { isAuthenticated } = Route.useRouteContext();
  const [open, setOpen] = useState(!isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to log in?</AlertDialogTitle>
            <AlertDialogDescription>
              🎬 Your watchlist is waiting — but you need to sign in first!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => router.history.back()}>
              <p className="text-sm">Cancel</p>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.navigate({ to: "/login" })}
            >
              <p className="text-sm">Yes</p>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <main className="flex-1">
      <WatchListItem />
    </main>
  );
}
