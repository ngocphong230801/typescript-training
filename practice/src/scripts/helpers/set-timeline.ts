export const formatTime = (currentTime: Date): string => {
    const hours = currentTime.getHours();
    const formattedHours = (hours % 24) || 24;
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    return `${formattedHours}:${minutes}:${seconds.toString().padStart(2, '0')}, ${currentTime.toLocaleDateString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" }
    )}`;
};
