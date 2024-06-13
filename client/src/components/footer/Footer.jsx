import React, { memo } from 'react';
import icons from '../../utils/icons';

const Footer = () => {
    const { MdOutlineEmail } = icons;
    return (
        <div className="w-full">
            <div className="h-[103px] bg-main flex items-center justify-center">
                <div className="w-main flex items-center justify-between">
                    <div className="flex flex-col flex-1">
                        <span className="text-[20px] text-gray-100">ĐĂNG KÝ BẢN TIN</span>
                        <small className="text-[13px] text-gray-300">Đăng ký ngay và nhận bản tin hàng tuần</small>
                    </div>
                    <div className="flex-1 flex items-center">
                        <input
                            placeholder="Email address"
                            type="text"
                            className="placeholder:text-gray-100 placeholder-italic outline-none text-gray-100 p-4 pr-0 rounded-l-full w-full bg-[#F04646]"
                        />
                        <div className="h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
                            {' '}
                            <MdOutlineEmail size={18} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]">
                <div className="w-main flex">
                    <div className="flex-2 flex flex-col gap-2">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                            ABOUTS US
                        </h3>
                        <span>
                            <span> Address: </span>
                            <span className="opacity-70">Thành phố Hồ Chí Minh</span>
                        </span>
                        <span>
                            <span> Phone: </span>
                            <span className="opacity-70">(+84) 919 622 111</span>
                        </span>
                        <span>
                            <span>Mail: </span>
                            <span className="opacity-70">: minhdang9a8@gmail.com</span>
                        </span>
                    </div>
                    <div className="flex-1 flex - flex-col gap-2 hidden md:flex">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                            Thông tin
                        </h3>
                        <span>Tổng quan</span>
                        <span>Triển lảm</span>
                        <span>Địa chỉ cửa hàng</span>
                        <span>Ưu đãi hôm nay</span>
                        <span>Liên hệ</span>
                    </div>
                    <div className="flex-1 flex - flex-col gap-2 hidden md:flex">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                            CHÚNG TÔI LÀ AI
                        </h3>
                        <span>Hỗ trợ</span>
                        <span>Miễn phí vận chuyển</span>
                        <span>FAQs</span>
                        <span>Trả lại & Trao đổi</span>
                        <span>Chứng thực</span>
                    </div>

                    <div className="flex-1  flex-col gap-2 hidden md:flex">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                            #TMD SHOP
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
