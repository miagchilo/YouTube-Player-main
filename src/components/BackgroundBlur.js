import './BackgroundBlur.css';

function BackgroundBlur({ hidden, onclick }) {

    return (
        <div className={"background-blur " + (hidden ? "hidden" : "")} onClick={onclick}>
        </div >
    );
}

export default BackgroundBlur;