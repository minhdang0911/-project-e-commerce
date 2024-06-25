import React from 'react';
import { Banner, Sidebar, BestSeller, FeatureProduct, Product } from '../../components';
import DealDaily from '../../components/products/DealDaily';
import Slider from 'react-slick';
import { CustomSlider } from '../../components';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import icons from '../../utils/icons';
import { createSearchParams, useNavigate } from 'react-router-dom';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const Home = () => {
    const { IoIosArrowForward } = icons;
    const { newProducts } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.app);
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full flex flex-col lg:flex-row mt-6">
                <div className="flex flex-col gap-5 w-full lg:w-[25%] flex-auto">
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className="flex flex-col gap-5 pl-0 lg:pl-5 w-full lg:w-[75%] flex-auto">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <FeatureProduct />
            </div>
            <div className="my-8 w-full">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">Sản phẩm mới</h3>
                <div className="mt-4 mx-[-10px]">
                    <CustomSlider products={newProducts} />
                </div>
            </div>
            <div className="my-8 w-full">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">BỘ SƯU TẬP HOT</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                    {categories
                        ?.filter((el) => el.brand.length > 0)
                        ?.map((el) => (
                            <div key={el._id} className="w-full md:w-[50%] lg:w-[30%] xl:w-[23%]">
                                <div className="border flex p-4 gap-4 min-h-[190px]">
                                    <img src={el?.image} className="w-[144px] h-[129px] object-cover" />
                                    <div className="text-gray-700 flex-1">
                                        <h4 className="font-semibold uppercase">{el.title}</h4>
                                        <ul className="text-sm">
                                            {el?.brand.map((item) => (
                                                <span
                                                    key={item}
                                                    className="flex gap-1 items-center text-gray-500 hover:underline cursor-pointer"
                                                    onClick={() =>
                                                        navigate({
                                                            pathname: `/${el?.title}`,
                                                            search: createSearchParams({ brand: item }).toString(),
                                                        })
                                                    }
                                                >
                                                    <IoIosArrowForward size={14} />
                                                    <li>{item}</li>
                                                </span>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="my-8 w-full">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">BLOG POSTS</h3>
            </div>
        </>
    );
};

export default Home;
