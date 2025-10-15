import { getUserSession } from "../../utils/auth-client";
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
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { motion } from "framer-motion";

const WatchListItem = () => {
  const utils = trpc.useUtils();
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getUserSession,
  });

  const { mutate: removeMovie } = trpc.watchlist.removeMovie.useMutation({
    onSuccess: () => {
      utils.watchlist.getWatchlist.invalidate();
    },
  });

  const {
    data: watchlist,
    isLoading,
    error,
  } = trpc.watchlist.getWatchlist.useQuery({
    userId: session?.session?.user.id,
  });

  if (error) console.log("Error in Watchlist:", error);

  return (
    <div className="relative w-full min-h-screen ">
      <div className="relative py-20 px-6 md:px-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-500 to-pink-400 bg-clip-text text-transparent"
        >
          Watchlist Items
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg max-w-2xl mx-auto"
        >
          Keep track of your favorite movies — all in one place 🎞️
        </motion.p>
      </div>

      <div className="px-6 md:px-14 pb-20">
        {!watchlist ? (
          <div className="flex items-center justify-center w-full h-70">
            {isLoading ? (
              <Loader />
            ) : (
              <p className="text-2xl font-semibold text-gray-300">
                Nothing here yet, start adding to your watchlist 👀
              </p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 h-full"
          >
            {watchlist.map((item) => (
              <motion.div
                key={item.movie_id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative group h-full"
              >
                <BackgroundGradient className="rounded-xl h-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                  <Card className="overflow-hidden py-0  border-none bg-transparent">
                    <CardContent className="p-0 h-full relative">
                      {/* 🎞️ Poster */}
                      <img
                        src={item.poster_url ?? "/assets/main.jpg"}
                        alt={item.title}
                        className="h-64 w-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* 🖋️ Details */}
                      <div className="p-4 text-left">
                        <CardTitle className="text-base font-semibold line-clamp-2">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-400 mt-1">
                          {item.release_year} • {item.genre}
                        </CardDescription>
                      </div>

                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="bg-red-600/90 hover:bg-red-700/90"
                            >
                              <p className="text-sm">Remove</p>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-zinc-900 text-white border border-zinc-800">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove from Watchlist?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This movie will be removed permanently from your
                                list.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
                                <p className="text-sm">Cancel</p>
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  removeMovie({ movieId: item.movie_id })
                                }
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <p className="text-sm">Remove</p>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                </BackgroundGradient>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WatchListItem;
