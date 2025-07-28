"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistRouter = void 0;
// server/trpc/routers/watchlist.ts
const index_1 = require("../index");
const watchlist_1 = require("../../../../packages/db/kysely/queries/watchlist"); // from your kysely logic
const watchlist_2 = require("../../../../packages/zod/watchlist"); // zod schema
exports.watchlistRouter = (0, index_1.router)({
    getWatchlist: index_1.publicProcedure
        .input(watchlist_2.addToWatchlistSchema)
        .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield (0, watchlist_1.getWatchlistByUser)(input.userId);
    })),
});
