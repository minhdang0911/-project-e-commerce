import React from 'react';
import Slider from 'react-slick';
import { Product } from './';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};
const CustomSlider = ({ products, activeTab }) => {
    return (
        <>
            {Product && (
                <Slider {...settings}>
                    {products?.map((item, index) => (
                        <Product pid={item.id} key={index} productData={item} isNew={activeTab === 1 ? false : true} />
                    ))}
                </Slider>
            )}
        </>
    );
};

export default CustomSlider;