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
    if (typeof number !== 'number' || isNaN(number)) {
        return '0 VND';
    }
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND');
};

export const reanderStartFromNumber = (number, size) => {
    if (!Number(number)) return;
    const starts = [];
    for (let i = 0; i < +number; i++) {
        starts.push(<FaStar color="orange" size={size || 16} />);
    }
    for (let i = 5; i > +number; i--) {
        starts.push(<CiStar color="orange" size={size || 16} />);
    }
    return starts;
};

export const validate = (payload, setInvalidFields) => {
    let invalids = 0;
    const formatPayload = Object.entries(payload);
    setInvalidFields([]); // Đặt lại trường không hợp lệ trước khi kiểm tra

    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++;
            setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'Trường này là bắt buộc' }]);
        }
    }

    // for (let arr of formatPayload) {
    //     switch (arr[0]) {
    //         case 'email':
    //             const emailRegex =
    //                 /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //             if (!arr[1].match(emailRegex)) {
    //                 invalids++;
    //                 setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'Email không hợp lệ' }]);
    //             }
    //             break;

    //         case 'password':
    //             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    //             if (!passwordRegex.test(arr[1])) {
    //                 invalids++;
    //                 setInvalidFields((prev) => [
    //                     ...prev,
    //                     {
    //                         name: arr[0],
    //                         mes: 'Mật khẩu phải có ít nhất 6 ký tự và bao gồm ít nhất 1 chữ thường 1 chữ hoa 1 số và 1 kí tự đặc biệt',
    //                     },
    //                 ]);
    //             }
    //             break;

    //         default:
    //             break;
    //     }
    // }

    return invalids;
};
