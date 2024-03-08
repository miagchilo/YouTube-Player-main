import PlaylistVideoPanel from './PlaylistVideoPanel';
import Search from './Search';
import './SearchForPlaylist.css';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => fetch(url).then((res) => res.json());

function SearchForPlaylist() {

    const { playlistId } = useParams();

    const { data, error, isLoading } = useSWR(
        `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`,
        fetcher,
        { refreshInterval: 100 }
    );

    function addVideoToPlaylist(videoId) {

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

                        })
                        .catch((error) => {
                            console.log(error);
                        }
                        );

                }).catch((error) => {
                    console.log(error);
                });

        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='search-for-playlist'>
            {error && <div className='search-for-playlist-space'></div>}
            {isLoading && <div className='search-for-playlist-space'></div>}
            {data && <div>
                <div className='search-for-playlist-header'>
                    <h1> Name: {data.name} </h1>
                    <h2> PlaylistId: {playlistId}</h2>
                </div>
                <PlaylistVideoPanel videos={data.videos} playlistId={playlistId} min={true} />
            </div>
            }
            <div className='search-for-playlist-search'>
                <Search isAdding={true} playlistId={playlistId} addVideoToPlaylist={addVideoToPlaylist} />
            </div>
        </div>
    );
}

export default SearchForPlaylist;
