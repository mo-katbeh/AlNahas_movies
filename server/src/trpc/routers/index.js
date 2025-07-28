"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// server/trpc/routers/index.ts
const index_1 = require("../index");
const watchlist_1 = require("./watchlist");
exports.appRouter = (0, index_1.router)({
    watchlist: watchlist_1.watchlistRouter,
});
