import './CreatePlaylist.css';
import useKeypress from '../hooks/useKeypress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function CreatePlaylist() {

    const navigate = useNavigate();
    const [playlistName, setPlaylistName] = useState("");

    function onClick(e) {

        axios.post('https://youtube.thorsteinsson.is/api/playlists', {
            name: playlistName,
        }).then((response) => {
            navigate(`/playlists/${response.data.id}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    useKeypress((key) => {
        if (key === "Enter")
            onClick();
    });

    return (
        <div className="create-playlist">
            <h1>Create a Playlist</h1>
            <h2>Put the name</h2>
            <div className="create-playlist-input">
                <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
                <i className="icon-plus" onClick={onClick}></i>
            </div>
        </div >
    );
}

export default CreatePlaylist;