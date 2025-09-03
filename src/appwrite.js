const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
import { Client, Databases, ID, Query } from "appwrite"

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID)

const database = new Databases(Client)
export const updateSearchCount = async (searchTerm, movie) => {
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID)
    // how?
    // first search in the appwrite sdk for the data
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        // if found then count++
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, { count: doc.count + 1 })
        }

        // if not then create, set its count as 1
        else {
            await Databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { searchTerm, count: 1, movie_id: movie.id, poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` })
        }

    } catch (error) {
        console.log(error)
    }
}