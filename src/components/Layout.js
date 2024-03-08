import './Layout.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import OptionsMenu from './OptionsMenu';
import useKeypress from '../hooks/useKeypress';

function Layout() {

    const [menuHidden, setMenuHidden] = useState(true);

    useKeypress((key) => {
        if (key === "Escape")
            setMenuHidden(true);
    });

    const onClickOption = () => {
        setMenuHidden(true);
    }

    return (
        <div className="layout">
            <div className="layout-header">
                <a className="layout-header-link" href="/">
                    <img className="layout-header-logo" src="/logo.png" alt=" logo" />
                </a>
                <i className="icon-reorder youtube-options" onClick={(e) => { setMenuHidden(!menuHidden) }}></i>
                <OptionsMenu hidden={menuHidden} onClick={onClickOption} />
            </div>
            <Outlet />
        </div>
    );
}

export default Layout;
