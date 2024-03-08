import './WatchPlaylist.css';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import PlaylistVideoPanel from './PlaylistVideoPanel';
import { useState } from 'react';
import axios from 'axios';
import useKeypress from '../hooks/useKeypress';
import { Link } from 'react-router-dom';

const fetcher = (url) => fetch(url).then((res) => res.json());

function WatchPlaylist() {

    const { playlistId } = useParams();

    const { data, error, isLoading } = useSWR(
        `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`,
        fetcher,
        { refreshInterval: 100 }
    );

    const [videoId, setVideoId] = useState("");

    const [wait, setWait] = useState(false);

    function onclick() {

        setWait(true);

        axios.get(`https://youtube.thorsteinsson.is/api/videos/${videoId}`, {
            "videoId": videoId
        }).then((response) => {
            console.log(response.data);

            if (response.data.videoId !== videoId) {
                alert("Video not found");
                return
            }

            axios.get(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`)
                .then((responsePlaylist) => {
                    console.log(responsePlaylist.data);

                    for (let i = 0; i < responsePlaylist.data.videos.length; i++) {
                        if (responsePlaylist.data.videos[i].videoId === videoId) {
                            setWait(false);
                            alert("Video already in playlist");
                            return;
                        }
                    }

                    axios.put(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`, {
                        "name": responsePlaylist.data.name,
                        "videos": [...responsePlaylist.data.videos,
                        {
                            videoId: response.data.videoId,
                            thumbnail: response.data.thumbnailUrl,
                            title: response.data.title,
                            views: response.data.views,
                        }]
                    })
                        .then((response) => {
                            console.log(response.data);

                            setVideoId("");

                            setWait(false);
                        })
                        .catch((error) => {
                            console.log(error);

                            setWait(false);
                        }
                        );

                }).catch((error) => {
                    console.log(error);
                    setWait(false);
                });

        }).catch((error) => {
            console.log(error);
            setWait(false);
        });
    }

    useKeypress((key) => {
        if (key === "Enter")
            onclick();
    });

    return (
        <div className="watch-playlist">

            {error && <div></div>}
            {isLoading && <div></div>}
            {data && <div>

                <div className='watch-playlist-top-container'>
                    <div>
                        <h2> PlaylistId: {playlistId}</h2>
                        <h1> Name: {data.name} </h1>
                    </div>
                    <div className='watch-playlist-add-video'>
                        <h3>
                            Add VideoId:
                        </h3>
                        <input value={videoId} onChange={(e) => setVideoId(e.target.value)}></input>
                        {!wait ?
                            <div className='watch-playlist-add-video-icon'>
                                <i className='icon-plus' onClick={onclick}> </i>
                            </div> :
                            <div className='watch-playlist-add-video-icon hide'>
                                <i className='icon-plus'> </i>
                            </div>}
                        <Link to={`/playlists/${playlistId}/search`}>
                            <div className='watch-playlist-search-video-icon'>
                                <i className='icon-search'> </i>
                            </div>
                        </Link>
                    </div>
                </div>
                <PlaylistVideoPanel videos={data.videos} playlistId={playlistId} />
            </div>}
        </div >
    );
}

export default WatchPlaylist;