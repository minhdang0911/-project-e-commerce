export function createSlug(string) {
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u{0300}-\u{36f}]/gu, '')
        .split(' ')
        .join('-');
}
