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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWatchlistByUser = getWatchlistByUser;
exports.getMoviesWithCategories = getMoviesWithCategories;
// src/db/queries/watchlist.ts
const client_1 = __importDefault(require("../client"));
function getWatchlistByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client_1.default
            .selectFrom('users')
            .selectAll()
            .selectAll()
            .where('id', '=', userId)
            .execute();
    });
}
function getMoviesWithCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client_1.default
            .selectFrom('moviecategories')
            .innerJoin('categories', 'categories.id', 'moviecategories.categoryId')
            .innerJoin('movies', 'movies.id', 'moviecategories.movieId')
            .select([
            'movies.title',
            'categories.name as categoryName',
        ])
            .execute();
    });
}
