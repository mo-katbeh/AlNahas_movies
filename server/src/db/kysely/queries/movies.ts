import db from "../client"
export async function getMovies() {
    return await db
        .selectFrom('movies')
        .offset(10)
        .leftJoin('movies')
        .selectAll()
        .limit(30)
        .execute()
}