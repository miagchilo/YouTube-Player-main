import './PlaylistVideoPanel.css';
import VideoCardPlaylist from './VideoCardPlaylist';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlaylistVideoPanel({ videos, playlistId, min, oneItem }) {

    function onDelete(e, videoId) {

        e.preventDefault();

        axios.get(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`)
            .then((responsePlaylist) => {
                console.log(responsePlaylist.data);

                let newVideos = responsePlaylist.data.videos.filter((video) => {
                    return video.videoId !== videoId;
                });

                axios.put(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`, {
                    "name": responsePlaylist.data.name,
                    "videos": newVideos
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    }
                    );

            }).catch((error) => {
                console.log(error);
            });
    }

    function randomize() {

        axios.get(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`).then((responsePlaylist) => {
            console.log(responsePlaylist.data);

            let videosTemp = responsePlaylist.data.videos;

            let currentIndex = videosTemp.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = videosTemp[currentIndex];
                videosTemp[currentIndex] = videosTemp[randomIndex];
                videosTemp[randomIndex] = temporaryValue;
            }

            axios.put(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`, {
                "name": responsePlaylist.data.name,
                "videos": videosTemp
            }
            )
        }
        )
    }

    return (
        <>
            <div className={'random-shuffle' + (min ? " min" : "")}>
                <p>Random:</p>
                <i className='icon-refresh' onClick={randomize}></i>
            </div>
            <div className={"playlist-video-panel" + (min ? " min" : "") + (oneItem ? " one-item" : "")}>
                {videos.map((video, index) => {
                    return (
                        <Link to={`/playlists/${playlistId}/videos/${video.videoId}`}>
                            <VideoCardPlaylist key={index} video={video} delay={index * 0.05} onDelete={onDelete} />
                        </Link>
                    );
                }
                )}
            </div >
        </>
    );
}

export default PlaylistVideoPanel;