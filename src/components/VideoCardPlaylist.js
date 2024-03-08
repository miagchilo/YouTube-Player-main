import './VideoCardPlaylist.css';
import { formatView } from '../helpers/FormatHelper';
import { motion } from 'framer-motion';

function VideoCardPlaylist({ video, delay = 0, onDelete }) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: delay
            }}
        >
            <div className="video-card-playlist">
                <div className="video-card-playlist-container-img">
                    <img className="video-thumbnail-playlist" src={video.thumbnail} alt={video.title} />
                    <div className="video-card-playlist-delete" onClick={(e) => onDelete(e, video.videoId)}>
                        <i className="icon-trash"></i>
                    </div>
                    {video.views && <p className='video-card-playlist-views'> {formatView(video.views) + ' views'} </p>}
                    {video.title && <p className='video-card-playlist-title'> {video.title.length > 50 ? video.title.substring(0, 50) + "..." : video.title} </p>}
                </div>
            </div>

        </motion.div >
    );
}

export default VideoCardPlaylist;
