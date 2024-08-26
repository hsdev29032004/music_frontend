export const formatNumber = (num) => {
    if (num < 1e3) {
        return Math.floor(num);
    } else if (num >= 1e3 && num < 1e6) {
        return (num / 1e3).toFixed(1) + 'K';
    } else if (num >= 1e6 && num < 1e9) {
        return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    }
}