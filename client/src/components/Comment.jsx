import React, { memo } from 'react';
import avatar from '../assets/avartardefault.jpg';
import moment from 'moment';
import { reanderStartFromNumber } from '../utils/helper';

const Comment = ({ image = avatar, name = 'Anonmyous', content, updatedAt, comment, star }) => {
    return (
        <div className="flex gap-4  max-h-[120px] ">
            <div className="flex-none">
                <img src={image} alt="avatar" className="w-[25px] h-[25px] object-cover rounded-full" />
            </div>
            <div className="flex flex-col flex-auto ">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{name}</h3>
                    <span className="text-xs italic ">{moment(updatedAt)?.fromNow()}</span>
                </div>
                <div className="flex flex-col gap-2 pl-4 mt-4 border py-2 bg-gray-100 border-gray-300">
                    <span className="items-center flex gap-2">
                        <span className="font-semibold">Đánh giá của khách hàng:</span>
                        <span className="flex items-center gap-1">
                            {reanderStartFromNumber(star)?.map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}
                        </span>
                    </span>

                    <span className="flex gap-2">
                        <span className="font-semibold">Bình luận của khách hàng:</span>
                        <span className="flex items-center gap-1">{comment}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(Comment);
