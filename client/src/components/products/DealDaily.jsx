import React, { useState, useEffect, useCallback, memo } from 'react';
import icons from '../../utils/icons';
import { apiGetProduct } from '../../apis/product';
import { reanderStartFromNumber, formatMoney } from '../../utils/helper';
import Countdown from '../common/Countdown';

const { FaStar, IoMdMenu } = icons;

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // Function to fetch new deal daily
    const fetchDealDaily = useCallback(async () => {
        try {
            const response = await apiGetProduct({
                limit: 1,
                page: Math.floor(Math.random() * 10) + 1,
                totalRatings: 5,
            });
            if (response.success && response.products.length > 0) {
                const selectedDeal = response.products[0];
                setDealDaily(selectedDeal);

                // Calculate time left until end of current day
                const now = new Date();
                const endOfCurrentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
                const timeDifference = endOfCurrentDay - now;

                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        } catch (error) {
            console.error('Failed to fetch daily deal:', error);
        }
    }, []);

    // Initial fetch when component mounts
    useEffect(() => {
        fetchDealDaily();
    }, [fetchDealDaily]);

    // Interval to update countdown timer
    useEffect(() => {
        const idInterval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const { hours, minutes, seconds } = prevTimeLeft;

                if (seconds > 0) {
                    return { hours, minutes, seconds: seconds - 1 };
                } else if (minutes > 0) {
                    return { hours, minutes: minutes - 1, seconds: 59 };
                } else if (hours > 0) {
                    return { hours: hours - 1, minutes: 59, seconds: 59 };
                } else {
                    fetchDealDaily(); // Refresh deal when countdown finishes
                    return { hours: 0, minutes: 0, seconds: 0 };
                }
            });
        }, 1000);

        return () => {
            clearInterval(idInterval);
        };
    }, [fetchDealDaily]);

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
                    <Countdown unit={'Hours'} number={timeLeft.hours} />
                    <Countdown unit={'Minutes'} number={timeLeft.minutes} />
                    <Countdown unit={'Seconds'} number={timeLeft.seconds} />
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
