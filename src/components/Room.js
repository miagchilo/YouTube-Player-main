import './Room.css';
import useSWR from 'swr';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Room() {

    const { roomId } = useParams();

    const [timeKey, setTimeKey] = useState(0);

    const { data, error, isLoading } = useSWR(
        `https://youtube.thorsteinsson.is/api/playlists/${roomId}`,
        fetcher,
        { refreshInterval: 1 }
    );

    const playerRef = useRef(null);

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    function onStateChange(e) {

        if (e.data !== 2) {
            return;
        }

        axios.put(`https://youtube.thorsteinsson.is/api/playlists/${roomId}`, {
            "name": "Room",
            "videos": [
                {
                    videoId: data.videos[0].videoId,
                    currentTime: e.target.getCurrentTime(),
                    timeKey: data.videos[0].timeKey + 1
                }]
        })
    }

    if (data && playerRef.current) {
        if (data.videos[0].timeKey > timeKey) {
            playerRef.current.internalPlayer.seekTo(data.videos[0].currentTime);
            setTimeKey(data.videos[0].timeKey);
        }
    }

    function onReady(e) {
        if (data) {
            e.target.seekTo(data.videos[0].currentTime);
        }
    }

    return (
        <div className="room">
            {error && <div></div>}
            {isLoading && <div></div>}
            {data && <YouTube
                ref={playerRef}
                videoId={data.videos[0].videoId}
                opts={opts}
                onStateChange={onStateChange}
                onReady={onReady}
            />}
        </div >
    );
}

export default Room;