import './ClickMe.css'

function ClickMe({ width, height, title, backgroundColor, textColor, borderRadius }) {

    return (
        <button className="click-me" style={{
            width: width, height: height, background: backgroundColor, color: textColor, 'border-radius': borderRadius + 'px'
        }}> {title}</button >
    );
}

export default ClickMe;