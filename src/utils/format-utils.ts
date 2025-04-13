export async function formateFileNameAsTitle(fileName: string) {
    const withoutExtension = fileName.replace(/\.[^/.]+$/, ''); // remove extension
    const withSpaces = withoutExtension
        .replace(/[-_]+/g, ' ') // replace underscores and hyphens with spaces
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // add spaces between camel case words

    return withSpaces
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
        .join(' ')
        .trim();
}
