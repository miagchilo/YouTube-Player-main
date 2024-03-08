import './VideoPlayer.css';
import useSWR from 'swr';
import { formatView } from '../helpers/FormatHelper';
import CopyLink from './CopyLink';
import YouTube from 'react-youtube';

const fetcher = (url) => fetch(url).then((res) => res.json());

function VideoPlayer({ videoId, onEnd = () => { } }) {

    const { data, error, isLoading } = useSWR(
        `https://youtube.thorsteinsson.is/api/videos/${videoId}`,
        fetcher
    );

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="video-player">
            <div className="video-container">
                <YouTube videoId={videoId} opts={opts} onEnd={() => onEnd(videoId)} />
            </div>
            {error && <div></div>}
            {isLoading && <div></div>}
            {data && <div className="video-player-info">
                <div className="video-player-title-info">
                    <h2 className="video-player-title">{data.title}</h2>
                    <div className="video-player-extra">
                        <p className="video-player-views"><b>{formatView(data.views)} views</b> </p>
                        <CopyLink link={window.location.origin + window.location.pathname} />
                    </div>
                </div>
                <p className="video-player-description">{data.description}</p>
            </div>}
        </div >
    );
}

export default VideoPlayer;
