import './PlaylistPlayer.css';
import VideoPlayer from './VideoPlayer';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';

const fetcher = (url) => fetch(url).then((res) => res.json());

function PlaylistPlayer() {

    const { playlistId, videoId } = useParams();

    const navigate = useNavigate();

    const { data, error, isLoading } = useSWR(
        `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`,
        fetcher,
        { refreshInterval: 100 }
    );

    if (data) {
        console.log(data.videos)
    }

    let videos = [];

    let time = new Date().getTime();

    if (data) {
        console.log(data)
        videos = data.videos.map((video, index) => {
            return <li key={video.videoId + "." + time}>
                <div className='video-card-container'>
                    <Link to={`/playlists/${playlistId}/videos/${video.videoId}`}>
                        <VideoCard video={video} delay={index * 0.05} isPlaying={video.videoId === videoId} />
                    </Link>
                </div>
            </li >
        }
        )
        videos = <ul className='search-list'> {videos} </ul>
    }

    function onEnd(videoId) {
        let index = data.videos.findIndex((video) => video.videoId === videoId);
        if (index < data.videos.length - 1) {
            navigate(`/playlists/${playlistId}/videos/${data.videos[index + 1].videoId}`)
        } else {
            navigate(`/playlists/${playlistId}/videos/${data.videos[0].videoId}`)
        }
    }

    return (
        <div className="playlist-player ">
            <VideoPlayer videoId={videoId} onEnd={onEnd} />
            {error && <div></div>}
            {isLoading && <div></div>}
            <Link to={`/playlists/${playlistId}`}>
                <button className='playlist-player-back'>Edit the Playlist</button>
            </Link>
            {data &&
                <div className='playlist-list'>{videos}</div>}
        </div>
    );
}

export default PlaylistPlayer;