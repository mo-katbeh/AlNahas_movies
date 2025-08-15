import db from "../client"
export async function getMovies() {
    return await db
        .selectFrom('movies')
        .selectAll()
        .limit(30)
        .execute()
}