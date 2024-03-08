export function formatView(views) {

    if (views >= 1000000000) {
        views = (views / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (views >= 1000000) {
        views = (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (views >= 1000) {
        views = (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return views;
}