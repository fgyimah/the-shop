import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* css resets */
    html, body,
    h1, h2, h3, h4, h5, h6,
    a, p, span,
    em, small, strong,
    sub, sup,
    mark, del, ins, strike,
    abbr, dfn,
    blockquote, q, cite,
    code, pre,
    ol, ul, li, dl, dt, dd,
    div, section, article,
    main, aside, nav,
    header, hgroup, footer,
    img, figure, figcaption,
    address, time,
    audio, video,
    canvas, iframe,
    details, summary,
    fieldset, form, label, legend,
    table, caption,
    tbody, tfoot, thead,
    tr, th, td {
        margin: 0;
        padding: 0;
        border: 0;
    }

    html {
        font-size: 62.5%;
        font-family: 'Lato', sans-serif;
    }

    body {
        font-size: 1.6rem;
        line-height: 1.4;
    }

    * {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    a,
    a:visited {
        color: inherit;
    }

    article,
    aside,
    footer,
    header,
    nav,
    section,
    main {
        display: block;
    }

    * {
        box-sizing: border-box;
    }

    *:before,
    *:after {
        box-sizing: inherit;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    ol,
    ul {
        list-style: none;
    }

    img,
    video {
        max-width: 100%;
    }

    img {
        border-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:after,
    blockquote:before,
    q:after,
    q:before {
        content: "";
        content: none;
    }

    [hidden] {
    display: none !important;
    }

    [disabled] {
        cursor: not-allowed;
    }

    :focus:not(:focus-visible) {
        outline: none;
    }
`;

export default GlobalStyle;
