export function getNowDate() {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() - 9);
    return now;
}
