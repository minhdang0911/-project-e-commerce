import { Breakcrumb, SelectQuantity } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatMoney } from 'utils/helper';

const DetailCart = ({ location }) => {
    const { current } = useSelector((state) => state.user);
    const [quantity, setQuantity] = useState(0);

    const handleQuantity = (number) => {
        if (number > 1) setQuantity(number);
    };

    const handleChanglQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return;
        if (flag === 'minus') setQuantity((prev) => +prev - 1);
        if (flag === 'plus') setQuantity((prev) => +prev + 1);
    };

    return (
        <div className="w-full">
            <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                <div className="w-main">
                    <h3 className="font-semi-bold uppercase">Chi tiết giỏ hàng</h3>
                    <Breakcrumb category={location.pathname} />
                </div>
            </div>
            <div className="font-bold grid-cols-10 w-main mx-auto grid border py-3">
                <span className="col-span-6 w-full">Sản phẩm</span>
                <span className="col-span-1 w-full ml-[20px]">Số lượng</span>
                <span className="col-span-3 w-full ml-[180px]">Giá</span>
            </div>
            {current?.cart?.map((el) => (
                <div key={el._id} className="font-bold grid-cols-10 w-main mx-auto grid border py-3">
                    <span className="col-span-6 w-full">
                        <div className="flex gap-2">
                            <img src={el?.product?.thumb} alt="thumb" className="w-28 h-28 object-cover" />
                            <div className="flex flex-col gap-1 items-start">
                                <span className="text-sm text-main">{el.product.title}</span>
                                <span className="text-[10px]">{el.color}</span>
                            </div>
                        </div>
                    </span>
                    <span className="col-span-1 w-full">
                        <div className="flex items-center h-full">
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChanglQuantity={handleChanglQuantity}
                            />
                        </div>
                    </span>
                    <span className="col-span-3 w-full text-center h-full flex items-center justify-center">
                        <span className="text-lg">{formatMoney(el?.product?.price)}</span>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default withBaseComponent(memo(DetailCart));
