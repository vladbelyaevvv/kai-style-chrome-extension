const styleEl = document.createElement("style");
styleEl.textContent = `
    html, body, div, footer {
    background-color: black !important;
    }

    p {
    color: #39ff14 !important;
    }

    .date, .time_label {
    color: #39ff14 !important;
    }
    
    a:link,  a:active {
    color: red !important;
    }

    a:visited {
    color: #550606ff !important;
    }

    a:hover {
    color: #d12f9bff !important;
    }
`;

document.head.appendChild(styleEl);