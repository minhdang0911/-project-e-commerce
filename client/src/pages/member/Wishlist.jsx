import { Product } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const { current } = useSelector((state) => state.user);
    console.log(current);
    return (
        <div className="w-full relative px-4">
            <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">Sản phẩm yêu thích</header>
            <div className="p-4 w-full grid grid-cols-5 gap-4">
                {current?.wishlist?.map((el) => (
                    <div key={el._id}>
                        <Product pid={el._id} productData={el} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
