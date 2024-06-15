import React, { useState, useEffect, memo } from 'react';
import icons from '../../utils/icons';
import { apiGetProduct } from '../../apis/product';
import { reanderStartFromNumber, formatMoney } from '../../utils/helper';
import Countdown from '../common/Countdown';

const { FaStar, IoMdMenu } = icons;

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(2);
    const [second, setSecond] = useState(2);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const response = await apiGetProduct({ limit: 1, page: Math.floor(Math.random() * 10) + 1, totalRatings: 5 });
        if (response.success) {
            setDealDaily(response.products[0]);
            const h = 24 - new Date().getHours();
            const m = 60 - new Date().getMinutes();
            const s = 60 - new Date().getSeconds();
            setHour(h);
            setMinutes(m);
            setSecond(s);
        } else {
            setHour(0);
            setMinutes(59);
            setSecond(59);
        }
    };

    useEffect(() => {
        fetchDealDaily();
    }, []);

    useEffect(() => {
        let idInterval = setInterval(() => {
            setSecond((prevSecond) => {
                if (prevSecond > 0) return prevSecond - 1;
                if (minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    return 59;
                }
                if (hour > 0) {
                    setHour((prevHour) => prevHour - 1);
                    setMinutes(59);
                    return 59;
                }
                setExpireTime((prevExpireTime) => !prevExpireTime);
                return 0;
            });
        }, 1000);

        return () => {
            clearInterval(idInterval);
        };
    }, [minutes, hour]);

    useEffect(() => {
        if (expireTime) {
            fetchDealDaily();
        }
    }, [expireTime]);

    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4 w-full">
                <span className="flex-1 pl-4">
                    <FaStar size={20} color="#DD1111" />
                </span>
                <span className="flex-8 font-semibold text-[20px] flex text-center text-gray-600">Deal Daily</span>
                <span className="flex-1"></span>
            </div>
            <div className="w-full flex flex-col items-center px-4 gap-2">
                <img src={dealDaily?.thumb} alt="" className="w-full object-contain" />
                <span className="flex h-4">
                    {reanderStartFromNumber(dealDaily?.totalRatings, 20)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}
                </span>
                <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
                <span>{formatMoney(dealDaily?.price)}</span>
            </div>
            <div className="px-4 mt-8">
                <div className="flex justify-center gap-2 items-center mb-4">
                    <Countdown unit={'Hours'} number={hour} />
                    <Countdown unit={'Minutes'} number={minutes} />
                    <Countdown unit={'Second'} number={second} />
                </div>
                <button
                    type="button"
                    className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
                >
                    <IoMdMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);
