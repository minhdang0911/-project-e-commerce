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
import { FaCartPlus } from 'react-icons/fa';
import { apiUpdateCart, apiUpdateWishlist } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { createSearchParams } from 'react-router-dom';

const { IoEyeSharp, IoMdMenu, FaHeart } = icons;

const Product = ({ productData, isNew, normal, dispatch, location, pid }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const imageUrl = productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
    const handleClickOption = async (e, flag) => {
        e.stopPropagation();

        if (flag === 'CART') {
            if (!current) {
                Swal.fire({
                    title: 'Almost',
                    text: 'Bạn phải đăng nhập để mua hàng',
                    icon: 'info',
                    showConfirmButton: 'Trở về đăng nhập',
                    showCancelButton: true,
                    confirmButtonText: 'Trở về đăng nhập',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate({
                            pathname: `/${path.LOGIN}`,
                            search: createSearchParams({ redirect: location.pathname }).toString(),
                        });
                    }
                });
            } else {
                const response = await apiUpdateCart({
                    pid: productData._id,
                    color: productData.color,
                    quantity: 1,
                    price: productData.price,
                    thumbnail: productData.thumb,
                    title: productData.title,
                });
                if (response.success) {
                    toast.success(response.mes);
                    dispatch(getCurrent());
                } else {
                    toast.error(response.mes);
                }
            }
        }

        if (flag === 'WISHLIST') {
            const response = await apiUpdateWishlist(pid);
            if (response.success) {
                toast.success(response.rs);
                dispatch(getCurrent());
            } else {
                toast.error(response.rs);
            }
        } else if (flag === 'QUICK_VIEW') {
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
                onClick={(e) => {
                    navigate(`/${productData?.category.toLowerCase()}/${productData?._id}/${productData?.title}`);
                    e.stopPropagation();
                }}
                className="w-full border p-[15px] flex flex-col items-center"
                onMouseOver={(e) => {
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
                            <span onClick={(e) => handleClickOption(e, 'QUICK_VIEW')} title="xem mô tả">
                                {' '}
                                <SelectOption icon={<IoEyeSharp />} />
                            </span>

                            {current?.cart?.some((el) => el.product._id === productData?._id) ? (
                                <span title="Đã thêm vào giỏ hàng">
                                    {' '}
                                    <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                                </span>
                            ) : (
                                <span onClick={(e) => handleClickOption(e, 'CART')} title="Thêm vào giỏ hàng">
                                    {' '}
                                    <SelectOption icon={<FaCartPlus />} />
                                </span>
                            )}

                            <span title="Thích sản phẩm" onClick={(e) => handleClickOption(e, 'WISHLIST')}>
                                <SelectOption
                                    icon={
                                        <FaHeart
                                            color={current?.wishlist?.some((i) => i._id === pid) ? 'red' : 'gray'}
                                        />
                                    }
                                />
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
