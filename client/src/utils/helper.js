import icons from './icons';
import { FaStarHalfAlt } from 'react-icons/fa';
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
    const stars = [];

    if (number >= 3.1 && number <= 3.4) {
        for (let i = 0; i < 3; i++) {
            stars.push(<FaStar color="orange" size={size || 16} key={i} />);
        }
        for (let i = 3; i < 5; i++) {
            stars.push(<CiStar color="orange" size={size || 16} key={i} />);
        }
    } else if (number >= 3.5 && number <= 3.9) {
        // 3 sao sáng, 1 sao sáng nửa, 1 sao không sáng
        for (let i = 0; i < 3; i++) {
            stars.push(<FaStar color="orange" size={size || 16} key={i} />);
        }
        stars.push(<FaStarHalfAlt color="orange" size={size || 16} key={3} />);
        stars.push(<CiStar color="orange" size={size || 16} key={4} />);
    } else {
        // Mặc định: Hiển thị số sao tương ứng với `number`
        for (let i = 0; i < Math.floor(number); i++) {
            stars.push(<FaStar color="orange" size={size || 16} key={i} />);
        }
        if (number % 1 !== 0) {
            stars.push(<FaStarHalfAlt color="orange" size={size || 16} key={Math.floor(number)} />);
        }
        for (let i = Math.ceil(number); i < 5; i++) {
            stars.push(<CiStar color="orange" size={size || 16} key={i} />);
        }
    }

    return stars;
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

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const generateRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (_, index) => {
        return start + index;
    });
};
export const getBase64 = (file) => {
    if (!file) return '';
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.toString();
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
};
