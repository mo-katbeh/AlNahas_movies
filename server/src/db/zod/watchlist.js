"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWatchlistItemSchema = exports.updateWatchlistItemSchema = exports.addToWatchlistSchema = exports.watchlistStatusEnum = void 0;
const zod_1 = require("zod");
exports.watchlistStatusEnum = zod_1.z.enum(['TO_WATCH', 'WATCHED']);
exports.addToWatchlistSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    movieId: zod_1.z.string().uuid(),
    status: exports.watchlistStatusEnum,
    rating: zod_1.z.number().min(1).max(5).optional(),
    review: zod_1.z.string().max(1000).optional(),
});
exports.updateWatchlistItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    status: exports.watchlistStatusEnum.optional(),
    rating: zod_1.z.number().min(1).max(5).optional(),
    review: zod_1.z.string().max(1000).optional(),
});
exports.deleteWatchlistItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
