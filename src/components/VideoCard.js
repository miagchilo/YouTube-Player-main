import './VideoCard.css';
import { formatView } from '../helpers/FormatHelper';
import { motion } from 'framer-motion';

function VideoCard({ video, isIndex, delay = 0, isPlaying = false }) {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: delay
            }}
        >
            <div className={'video-card' + (isIndex ? " index" : "") + (isPlaying ? " playing" : "")}>
                <img className={"video-thumbnail" + (isIndex ? " index" : "")} src={video.thumbnail} alt={video.title} />
                <div className="video-card-right-side">
                    <p className={"video-title" + (isIndex ? " index" : "")}>{video.title.length > 50 ? video.title.substring(0, 50) + "..." : video.title}</p>
                    <p className={"video-views" + (isIndex ? " index" : "")}>{formatView(video.views)} views</p>
                </div>
            </div>

        </motion.div >
    );
}

export default VideoCard;
