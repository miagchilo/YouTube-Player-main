import './Search.css';
import { useState } from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import { motion } from 'framer-motion';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Search({ defaultSearch = '', isIndex = false, isAdding = false, playlistId = '', addVideoToPlaylist = () => { } }) {

    const [search, setSearch] = useState(defaultSearch);

    const { data, error, isLoading } = useSWR(
        `https://youtube.thorsteinsson.is/api/search?q=${search}`,
        fetcher
    );

    let videos = [];

    let time = new Date().getTime();

    if (Array.isArray(data)) {
        videos = data.map((video, index) => {
            return <li key={video.id.videoId + "." + time}>
                <div className='video-card-container'>
                    {isAdding &&
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: index * 0.05
                            }}>
                            <i className='icon-plus-sign' onClick={() => addVideoToPlaylist(video.id.videoId)}></i>
                        </motion.div>}
                    <Link to={`/videos/${video.id.videoId}?q=${search}`}>
                        <VideoCard video={{ thumbnail: video.snippet.thumbnails.url, title: video.title, views: video.views }} isIndex={isIndex} isAdding={isAdding} delay={index * 0.05} />
                    </Link>
                </div>
            </li >
        }
        )
        videos = <ul className='search-list'> {videos} </ul>
    }

    let timerId;

    function handleInputChange(event) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            setSearch(event.target.value);
        }, 500);
    }

    return (
        <div className={"search" + (isIndex ? " index" : "")}>
            <div className="search-bar-container">
                {isAdding &&
                    <Link className='search-back' to={`/playlists/${playlistId}`}>
                        <i className='icon-reply'></i>
                    </Link>
                }
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Search" onChange={handleInputChange} />
                    <div className="search-icon">
                        <i className="icon-search"></i>
                    </div>
                </div>
            </div>
            {error && <div></div>}
            {isLoading && <div></div>}
            {videos}
        </div>
    );
}

export default Search;
