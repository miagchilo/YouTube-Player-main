import './Playlists.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useKeypress from '../hooks/useKeypress';

function Playlists() {

    const navigate = useNavigate();
    const [playlistId, setPlaylistId] = useState("");

    function onClick(e) {

        navigate(`/playlists/${playlistId}`);
    }

    useKeypress((key) => {
        if (key === "Enter")
            onClick();
    });

    return (
        <div className="playlists">
            <h1>Find the Playlist by the Id</h1>
            <div className="playlists-input">
                <input type="text" value={playlistId} onChange={(e) => setPlaylistId(e.target.value)} />
                <i className="icon-search" onClick={onClick}></i>
            </div>
        </div >
    );
}

export default Playlists;