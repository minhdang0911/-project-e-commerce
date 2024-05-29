import React from 'react';
import { Banner, Sidebar, BestSeller, FeatureProduct, Product } from '../../components';
import DealDaily from '../../components/DealDaily';
import Slider from 'react-slick';
import { CustomSlider } from '../../components';
import { useSelector, UseSelector } from 'react-redux/es/hooks/useSelector';

// import { apiGetProduct } from '../../apis/product';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const Home = () => {
    const { newProducts } = useSelector((state) => state.products);
    return (
        <>
            <div className="w-main flex">
                <div className="flex flex-col gap-5 w-[25%] flex-auto ">
                    <Sidebar />

                    <DealDaily />
                </div>
                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <FeatureProduct />
            </div>
            <div className="my-8 w-full">
                <h3
                    className="text-[20px] font-semibold py-[15px] 
                border-b-2 border-main"
                >
                    NEW ARRIVALS
                </h3>
                <div className=" mt-4 mx-[-10px]">
                    <CustomSlider products={newProducts} />
                </div>
            </div>

            <div className="w-full h-[500px]"></div>
        </>
    );
};
export default Home;
