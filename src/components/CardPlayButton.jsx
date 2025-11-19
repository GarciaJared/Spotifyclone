import { Play, Pause } from "./Player.jsx";
import { usePlayerStore } from "@/store/playerStore.js";



export function CardPlayButton({ id }) {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state);
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

    const handleClick = () => {

        if (isPlayingPlaylist) {
            setIsPlaying(false);
            return;
        }
        setCurrentMusic({ playlist: { id } });
        fetch(`/api/get-info-playlist?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                setIsPlaying(true);
                setCurrentMusic({ songs, playlist, song: songs[0] })

                console.log({ songs, playlist })
            })
    }

    return (
        <button onClick={handleClick} className="card-play-button rounded-full p-4 bg-[#154D71] opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200">
            { isPlayingPlaylist ? <Pause /> : <Play /> }
        </button>
    )
}