import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Breakcrumb } from 'components';
import { useParams } from 'react-router-dom';

const Contact = () => {
    const params = useParams();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        document.title = 'liên hệ';
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Your message has been sent successfully!');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 ">Liên hệ</h1>
            <Breakcrumb title={params} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.126453692951!2d106.71188127423935!3d10.801625758730003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a5a7e26497%3A0xd6b32389e19641de!2zNDc1IMSQLiDEkGnhu4duIEJpw6puIFBo4bunLCBQaMaw4budbmcgMjUsIELDrG5oIFRo4bqhbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1718883919674!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map"
                    ></iframe>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="flex items-center mb-2">
                        <FaMapMarkerAlt className="mr-2 text-xl" /> Địa chỉ: 475 Điện Biên Phủ
                    </p>
                    <p className="flex items-center mb-2">
                        <FaClock className="mr-2 text-xl" /> Thời gian mở cửa:
                    </p>
                    <ul className="ml-6 mb-2 list-disc">
                        <li>Thứ 2- Thứ 6: 11.00 - 20.00</li>
                        <li>Thứ 7: 10.00 - 20.00</li>
                        <li>Chủ Nhật: 10.00 - 17.00</li>
                    </ul>
                    <p className="flex items-center mb-2">
                        <FaEnvelope className="mr-2 text-xl" /> Email: minhdang9a8@gmail.com
                    </p>
                    <p className="flex items-center mb-2">
                        <FaPhone className="mr-2 text-xl" /> Số điện thoại (+84) 919 222 111
                    </p>
                </div>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg w-full"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="message"
                        placeholder="Nội dung"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg w-full"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Gửi
                </button>
            </form>
        </div>
    );
};

export default Contact;
