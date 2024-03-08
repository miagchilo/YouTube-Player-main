import './OptionsMenu.css';
import { Link } from 'react-router-dom';
import BackgroundBlur from './BackgroundBlur';

function OptionsMenu({ hidden, onClick }) {

    return (
        <>
            <BackgroundBlur hidden={hidden} onclick={onClick} />
            <div className={"options-menu " + (hidden ? "hidden" : "")}>
                <div className="options-menu-list">
                    <div className="options-menu-section">
                    </div>

                    <Link to="/" className='options-menu-item-link' onClick={onClick}>
                        <div className="options-menu-item">
                            <i className="icon-search"></i>
                            <span className="options-menu-text">Search Video</span>
                            <i className="icon-chevron-right"></i>
                        </div>
                    </Link>

                    <Link to="/playlists" className='options-menu-item-link' onClick={onClick}>
                        <div className="options-menu-item">
                            <i className="icon-music"></i>
                            <span className="options-menu-text">Go to Playlists</span>
                            <i className="icon-chevron-right"></i>
                        </div>
                    </Link>

                    <Link to="/playlists/create" className='options-menu-item-link' onClick={onClick}>
                        <div className="options-menu-item">
                            <i className="icon-plus"></i>
                            <span className="options-menu-text">Create a Playlist</span>
                            <i className="icon-chevron-right"></i>
                        </div>
                    </Link>
                </div>
            </div >
        </>
    );
}

export default OptionsMenu;