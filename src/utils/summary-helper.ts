export const parseSection = (section: string): { title: string; points: string[] } => {
    const [title, ...rest] = section.split("\n");
    const cleanTitle = title.startsWith("#")
        ? title.substring(1).trim()
        : title.trim();

    const points: string[] = [];
    let currentPoint = "";

    rest.forEach((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("•")) {
            if (currentPoint) points.push(currentPoint.trim());
            currentPoint = trimmedLine;
        } else if (trimmedLine) {
            currentPoint += " " + trimmedLine;
        }
    });

    if (currentPoint) points.push(currentPoint.trim());

    return {
        title: cleanTitle,
        points: points.filter(
            (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
        ),
    };
};

export function parsePoint(point: string) {
    const isNumbered = /^\d+\./.test(point);
    const isMainPoint = /^•/.test(point);
    const isEmpty = !point.trim();

    const emojiRegex = /\p{Emoji}/u;
    const hasEmoji = emojiRegex.test(point);

    return {
        isNumbered,
        isMainPoint,
        hasEmoji,
        isEmpty
    };
}

export function parseEmojiPoint(content: string) {
    const cleanContent = content.replace(/^•\s*/, '');

    // Match emoji(s) at the start followed by text
    const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.+)$/u);
    if (!matches) return null;

    const [, emoji, text] = matches;

    return {
        emoji: emoji.trim(),
        text: text.trim()
    };
}