import WatchListItem from "@/components/WatchListItem";
import {
  createFileRoute,
  useNavigate,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
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
import { useState, type ChangeEvent } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export const Route = createFileRoute("/_layout/watchlist")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUserSession();
    return { isAuthenticated: session?.isAuthenticated || false };
  },
  validateSearch: z.object({
    q: z.string().optional().default(""),
  }),
});

function RouteComponent() {
  const search = useSearch({ from: "/_layout/watchlist" });
  const { isAuthenticated } = Route.useRouteContext();
  const [open, setOpen] = useState(!isAuthenticated);
  const navigate = useNavigate();
  const router = useRouter();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: { q: event.target.value },
    });
  };
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search movies..."
            value={search.q}
            onChange={handleSearchChange}
            className="pl-9 w-full border border-gray-700 bg-zinc-900 text-white"
          />
        </div>
      </div>

      <WatchListItem searchQuery={search.q} />
    </div>
  );
}
