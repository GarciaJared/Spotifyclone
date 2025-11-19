import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({ params, request }){
// GET ID FROM URL

const { url } = request; 
const urlObject = new URL(url)
const id = urlObject.searchParams.get("id")


const playlist = allPlaylists.find((playlist) => playlist.id === id);
const songs = allSongs.filter((song)=> song.albumId === id)


return new Response(JSON.stringify({ playlist, songs}), {
    headers: { "Content-Type": "application/json" },
    status: 200,
})
}