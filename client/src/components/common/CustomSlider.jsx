import React, { memo } from 'react';
import Slider from 'react-slick';
import { Product } from '..';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};
const CustomSlider = ({ products, activeTab, normal }) => {
    return (
        <>
            {Product && (
                <Slider className="custom-slider" {...settings}>
                    {products?.map((item, index) => (
                        <Product
                            normal={normal}
                            pid={item._id}
                            key={index}
                            productData={item}
                            isNew={activeTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            )}
        </>
    );
};

export default memo(CustomSlider);
