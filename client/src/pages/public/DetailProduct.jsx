import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProductByID, apiGetProduct } from '../../apis/product';
import { Breakcrumb, Button, ProductExtraInfoItem, ProductInformation, CustomSlider } from '../../components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, reanderStartFromNumber } from '../../utils/helper';
import { SelectQuantity } from '../../components';
import { productExtraInfomation } from '../../utils/contants';
import DOMPurify from 'dompurify';
import clsx from 'clsx';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relativProduct, setRelativeProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [update, setUpdate] = useState(false);
    const [varriants, setVarriants] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        thumb: '',
        images: '',
        price: '',
    });

    useEffect(() => {
        if (varriants) {
            setCurrentProduct({
                title: product.varriants?.find((el) => el.sku === varriants)?.title,
                color: product.varriants?.find((el) => el.sku === varriants)?.color,
                price: product.varriants?.find((el) => el.sku === varriants)?.price,
                images: product.varriants?.find((el) => el.sku === varriants)?.images,
            });
        }
    }, [varriants]);

    const reRender = useCallback(() => {
        setUpdate(!update);
    }, [update]);
    useEffect(() => {
        if (pid) {
            fetchProductData();
            fetchProducts();
        }
        window.scrollTo(0, 0);
    }, [pid]);

    useEffect(() => {
        if (pid) {
            fetchProductData();
        }
    }, [update]);

    const fetchProductData = async () => {
        const response = await apiGetProductByID(pid);
        if (response.success) {
            setProduct(response.productData);
            setCurrentImage(response?.productData?.thumb);
        }
    };

    const fetchProducts = async () => {
        const res = await apiGetProduct({ category });
        if (res.success) setRelativeProduct(res.products);
    };

    // const handleQuantity = useCallback(
    //     (number) => {
    //         if (!Number(number) || Number(number) < 1) {
    //             return;
    //         } else {
    //             setQuantity(number);
    //         }
    //     },
    //     [quantity],
    // );

    const handleQuantity = useCallback(
        (number) => {
            if (number === '' || (Number(number) && Number(number) >= 1)) {
                setQuantity(number);
            }
        },
        [quantity],
    );

    const handleChanglQuantity = useCallback(
        (flag) => {
            if (flag === 'minus' && quantity === 1) return;
            if (flag === 'minus') setQuantity((prev) => +prev - 1);
            if (flag === 'plus') setQuantity((prev) => +prev + 1);
        },
        [quantity],
    );

    const handleClickImage = (e, el) => {
        e.stopPropagation();
        setCurrentImage(el);
    };

    console.log(currentProduct);

    return (
        <div className="w-full relative">
            <div className="h-[81px] bg-gray-100 flex  justify-center items-center">
                <div className="w-main ">
                    <h3 className="font-semi-bold">{currentProduct?.title || product?.title}</h3>
                    <Breakcrumb title={currentProduct?.title || product?.title} category={category} />
                </div>
            </div>
            <div className="w-main m-auto mt-4 flex">
                <div className="flex-4 flex flex-col gap-4 w-2/5">
                    <div className="h-[458px] w-[458px] ">
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: currentProduct?.thumb || currentImage,
                                },
                                largeImage: {
                                    src: currentProduct?.thumb || currentImage,
                                    width: 1800,
                                    height: 1800,
                                },
                            }}
                        />
                    </div>

                    <div className="w-[458px]">
                        <Slider {...settings} className="image-slider flex gap-2 justify-between">
                            {currentProduct?.images.length === 0 &&
                                product?.image?.map((el) => (
                                    <div key={el} className=" ">
                                        <img
                                            onClick={(e) => handleClickImage(e, el)}
                                            src={el}
                                            alt="sub product"
                                            className="cursor-pointer h-[143px] w-[143px] border object-cover "
                                        />
                                    </div>
                                ))}

                            {currentProduct?.images.length > 0 &&
                                currentProduct?.images?.map((el) => (
                                    <div key={el} className=" ">
                                        <img
                                            onClick={(e) => handleClickImage(e, el)}
                                            src={el}
                                            alt="sub product"
                                            className="cursor-pointer h-[143px] w-[143px] border object-cover "
                                        />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </div>
                <div className=" w-2/5 pr-[24px] flex flex-col gap-4 ">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] font-semibold">{`${formatMoney(
                            formatPrice(currentProduct?.price || product?.price),
                        )} `}</h2>
                        <span className="text-sm text-main">{`Số lượng:${product?.quantity}`}</span>
                    </div>
                    <div className="flex items-center gap-1 ">
                        {reanderStartFromNumber(product?.totalRatings)?.map((el) => (
                            <span key={el}>{el}</span>
                        ))}
                        <span className="text-sm text-main italic">{`(Đã bán :${product?.sold})`}</span>
                    </div>
                    <ul className="text-sm text-gray-500 list-square pl-4">
                        {product?.description?.length > 1 &&
                            product?.description?.map((el) => (
                                <li key={el} className="leading-6">
                                    {el}
                                </li>
                            ))}
                        {product?.description?.length <= 1 && (
                            <div
                                className="text-sm line-clamp-[10] mb-8 "
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}
                            ></div>
                        )}
                    </ul>

                    <div className="my-4 flex  gap-4">
                        <span className="font-semibold whitespace-nowrap text-xs">Màu sắc:</span>
                        <div className="flex flex-wrap gap-4 items-center w-full ">
                            <div
                                onClick={() => setVarriants(null)}
                                className={clsx(
                                    'flex items-center gap-2 p-2 border cursor-pointer',
                                    !varriants && 'border-red-500',
                                )}
                            >
                                <img src={product?.thumb} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                                <span className="flex flex-col ">
                                    <span>{product?.color}</span>
                                    <span className="text-sm ">{product?.price}</span>
                                </span>
                            </div>
                            {product?.varriants?.map((el) => (
                                <div
                                    onClick={() => setVarriants(el.sku)}
                                    className={clsx(
                                        'flex items-center gap-2 p-2 border cursor-pointer',
                                        varriants === el.sku && 'border-red-500',
                                    )}
                                >
                                    <img src={el?.thumb} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                                    <span className="flex flex-col ">
                                        <span>{el?.color}</span>
                                        <span className="text-sm ">{el?.price}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Số lượng</span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChanglQuantity={handleChanglQuantity}
                            />
                        </div>
                        <Button fw>Thêm vào giỏ hàng</Button>
                    </div>
                </div>
                <div className="w-1/5  ">
                    {productExtraInfomation.map((el) => (
                        <ProductExtraInfoItem key={el?.id} title={el?.title} icon={el.icon} sub={el.sub} />
                    ))}
                </div>
            </div>

            <div className="w-main m-auto mt-8">
                <ProductInformation
                    pid={product?._id}
                    nameProduct={product?.title}
                    totalRatings={product?.totalRatings}
                    ratings={product?.ratings}
                    reRender={reRender}
                />
            </div>
            <div className="w-main m-auto mt-[22rem]">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">Sản phẩm tương tự </h3>
                <CustomSlider products={relativProduct} normal={true} />
            </div>
            <div className="h-[100px] w-full"></div>
        </div>
    );
};

export default DetailProduct;
