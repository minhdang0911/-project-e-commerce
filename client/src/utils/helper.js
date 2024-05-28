import icons from './icons';
const { FaStar, CiStar } = icons;
export function createSlug(string) {
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u{0300}-\u{36f}]/gu, '')
        .split(' ')
        .join('-');
}

export const formatMoney = (number) => {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND');
};

export const reanderStartFromNumber = (number) => {
    if (!Number(number)) return;
    const starts = [];
    for (let i = 0; i < +number; i++) {
        starts.push(<FaStar color="orange" />);
    }
    for (let i = 5; i > +number; i--) {
        starts.push(<CiStar color="orange" />);
    }
    return starts;
};
