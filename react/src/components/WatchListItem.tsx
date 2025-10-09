import { toast } from "sonner";
import { authClient } from "../../utils/auth-client";
import { trpc } from "../../utils/trpc";
import Loader from "./loader/styled-wrapper";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { BackgroundGradient } from "./ui/shadcn-io/background-gradient";
import { useQuery } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
const getUserSession = async () => {
  const { data: session, error } = await authClient.getSession();
  if (!error) return session;
  toast.error("You are not signed in!");
};
const WatchListItem = () => {
  const utils = trpc.useUtils();
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getUserSession,
  });
  const { mutate: removeMovie, error: watchlistError } =
    trpc.watchlist.removeMovie.useMutation({
      onSuccess: () => {
        console.log("Success remove movie");
        utils.watchlist.getWatchlist.invalidate();
      },
    });
  const {
    data: watchlist,
    isLoading,
    error,
  } = trpc.watchlist.getWatchlist.useQuery({
    userId: session?.user.id,
  });
  if (error) console.log("error in Watchlist page", error);
  if (watchlistError)
    console.log("watchlistError in Watchlist page", watchlistError);
  return (
    <div className="m-2 ">
      <p className="text-2xl m-2 mb-4 font-bold">My Watchlist:</p>
      {!watchlist ? (
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <p className="text-2xl md:text-2xl font-semibold text-white line-clamp-6">
              Nothing here yet, stay tuned 👀
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {watchlist.map((watchlistItem) => (
            <BackgroundGradient
              key={watchlistItem.movie_id}
              className="rounded-xl bg-white dark:bg-zinc-900"
            >
              <Card className="relative h-[400px] py-0 gap-0">
                <CardContent className=" px-0 w-full ">
                  <img
                    className="rounded-xl rounded-bl-none rounded-br-none h-[250px] w-full bg-gray-100"
                    src={watchlistItem.poster_url ?? undefined}
                    alt={watchlistItem.title}
                  />
                  <div className="p-3">
                    <CardTitle className="text-sm pb-5">
                      {watchlistItem.title}
                    </CardTitle>
                    <CardDescription>
                      <p>{watchlistItem.release_year}</p>
                      <p>{watchlistItem.genre}</p>
                    </CardDescription>
                  </div>

                  <div className="absolute m-2 mb-5 mr-5 right-0 bottom-0">
                    {/* <span className="text-sm font-bold">$199</span> */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          type="button"
                          variant="destructive"
                          className="bg-red-600/90 text-xs px-2 py-1 h-7 "
                        >
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will remove "{watchlistItem.title}"
                            movie from your watchlist
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            <p className="text-sm">Cancel</p>
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600/90 hover:bg-red-600/50"
                            color="bg-red-500"
                            onClick={() =>
                              removeMovie({ movieId: watchlistItem.movie_id })
                            }
                          >
                            <p className="text-sm text-white">Remove</p>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </BackgroundGradient>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListItem;
