export function timeAgo(dateString) {
    // https://articlearn.id/article/d1a6b5cc-how-to-format-time-since-or-time-ago-in-j/
    const date = new Date(dateString);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const seconds = Math.round((today - date) / 1000);

    if (seconds < 20) {
        return "just now";
    } else if (seconds < 60) {
        return "about a minute ago";
    }

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }

    const isToday = today.toDateString() === date.toDateString();
    if (isToday) {
        return "Today";
    }

    const yesterday = new Date(today - DAY_IN_MS);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    if (isYesterday) {
        return "Yesterday";
    }

    const daysDiff = Math.round((today - date) / (1000 * 60 * 60 * 24));
    if (daysDiff < 30) {
        return `${daysDiff} days ago`;
    }

    const monthsDiff =
        today.getMonth() -
        date.getMonth() +
        12 * (today.getFullYear() - date.getFullYear());
    if (monthsDiff < 12) {
        return `${monthsDiff} months ago`;
    }

    const yearsDiff = today.getYear() - date.getYear();

    return `${yearsDiff} years ago`;
}
