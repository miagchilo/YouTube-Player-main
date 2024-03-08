import './WelcomeCard.css'

function WelcomeCard({ width, height, title, backgroundColor, textColor }) {

    return (
        <div className="welcome-card" style={{ width: width, height: height, background: backgroundColor, color: textColor }}>
            <p> {title} </p>
        </div >
    );
}

export default WelcomeCard;