import './YouTubePlayer.css';
import Search from './Search';
import VideoPlayer from './VideoPlayer';
import { useParams, useSearchParams } from 'react-router-dom';

function YouTubePlayer() {

    const { videoId } = useParams();
    let [searchParams] = useSearchParams();

    return (
        <div className="youtube-player">
            <VideoPlayer videoId={videoId} />
            <Search defaultSearch={searchParams.get('q')} />
        </div>
    );
}

export default YouTubePlayer;
