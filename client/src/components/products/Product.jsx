import React, { useState, memo } from 'react';
import { formatMoney } from '../../utils/helper';
import label from '../../assets/label.jpg';
import labelBlue from '../../assets/labelblue.png';
import { reanderStartFromNumber } from '../../utils/helper';
import SelectOption from '../search/SelectOption';
import icons from '../../utils/icons';
import { Link, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import withBaseComponent from 'hocs/withBaseComponent';
import { useNavigate } from 'react-router-dom';
import { showModal } from 'store/app/appSlice';
import { DetailProduct } from 'pages/public';

const { IoEyeSharp, IoMdMenu, FaHeart } = icons;

const Product = ({ productData, isNew, normal, dispatch }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const navigate = useNavigate();

    const imageUrl = productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
    const handleClickOption = (e, flag) => {
        e.stopPropagation();
        if (flag === 'MENU')
            navigate(`/${productData?.category.toLowerCase()}/${productData?._id}/${productData?.title}`);
        if (flag === 'WISHLIST') console.log('wishlist');
        if (flag === 'QUICK_VIEW') {
            dispatch(
                showModal({
                    isShowModal: true,
                    modalChildren: (
                        <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView />
                    ),
                }),
            );
        }
    };
    return (
        <div className="w-full text-base  px-[10px]">
            <div
                onClick={(e) =>
                    navigate(`/${productData?.category.toLowerCase()}/${productData?._id}/${productData?.title}`)
                }
                className="w-full border p-[15px] flex flex-col items-center"
                onMouseOver={(e) => {
                    e.stopPropagation();
                    setIsShowOption(true);
                }}
                onMouseLeave={(e) => {
                    setIsShowOption(false);
                    e.stopPropagation();
                }}
            >
                <div className="w-full relative">
                    {isShowOption && (
                        <div className="absolute bottom-[-10px]  left-0 right-0 flex justify-center gap-2 animate-slide-top ">
                            <span onClick={(e) => handleClickOption(e, 'QUICK_VIEW')}>
                                {' '}
                                <SelectOption icon={<IoEyeSharp />} />
                            </span>

                            <span onClick={(e) => handleClickOption(e, 'MENU')}>
                                {' '}
                                <SelectOption icon={<IoMdMenu />} />
                            </span>
                            <span onClick={(e) => handleClickOption(e, 'WISHLIST')}>
                                <SelectOption icon={<FaHeart />} />
                            </span>
                        </div>
                    )}
                    <img
                        src={imageUrl}
                        alt={productData?.title || 'Product Image'}
                        className="w-[274px] h-[274px] object-cover"
                    />

                    {!normal && (
                        <>
                            {isNew === true ? (
                                <img
                                    src={label}
                                    alt=""
                                    className="absolute top-[-22px] left-[-31px] w-[100px] h-[50px] object-cover"
                                />
                            ) : (
                                <img
                                    src={labelBlue}
                                    alt=""
                                    className="absolute top-[-30px] left-[-20px] w-[80px] h-[50px] object-cover"
                                />
                            )}

                            {isNew === true ? (
                                <span className="font-bold absolute top-[-8px] left-[5px] text-white">New</span>
                            ) : (
                                <span className="font-bold absolute text-sm top-[-15px] left-[-14px] text-white">
                                    Trending
                                </span>
                            )}
                        </>
                    )}
                </div>
                <div className="flex flex-col  mt-[15px] items-start gap-1 w-full">
                    <span className="flex h-4">
                        {reanderStartFromNumber(productData?.totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)}`}</span>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Product));
