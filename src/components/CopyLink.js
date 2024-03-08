import React, { useState } from 'react';
import './CopyLink.css';

function CopyLink(props) {
    const [copied, setCopied] = useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(props.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="CopyLink">
            <button className={copied ? "CopiedButton" : "CopyButton"} onClick={copyToClipboard}>
                {copied ? 'Copied' : 'Get Link'}
            </button>
        </div >
    );
}

export default CopyLink;