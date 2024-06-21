import React, { useState } from 'react';
import { Breakcrumb } from 'components';
import { useParams } from 'react-router-dom';

const FQA = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const params = useParams();

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: 'Bạn chấp nhận khoản thanh toán nào?',
            answer: 'Tôi chấp nhận mọi loại thanh toán từ shipcod cho đến chuyển khoản',
        },
        {
            question: 'Bạn có thể giao hàng ở nước nào?',
            answer: 'Tôi sẽ giao hàng ở trong nước và một số nước trong khu vực đông nam á',
        },
        {
            question: 'Tôi có thể hoàn trả hàng được không?',
            answer: 'Được, bạn có thể hoàn trả hàng trong vòng 7 ngày kể từ khi nhận hàng',
        },
        {
            question: 'Làm thế nào để theo dõi bưu kiện của tôi?',
            answer: 'Bạn có thể theo dõi trên website phần lịch sử mua hàng',
        },
    ];

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 ml-[-320px] ">FAQ</h1>
            <div className="ml-[-320px]">
                <Breakcrumb title={params} />
            </div>

            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300 py-2">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
                        <h3 className="text-lg font-medium">{faq.question}</h3>
                        <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
                    </div>
                    <div
                        className={`mt-2 text-gray-600 transition-all duration-500 ease-in-out ${
                            openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                    >
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FQA;
