import React, { memo, useState } from 'react';
import { productInfoTabs } from '../utils/contants';

const activedStyles = '';
const notActivedStyles = '';

const ProductInformation = () => {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <div>
            <div className="flex items-center gap-2 relative bottom-[-1px]">
                {productInfoTabs.map((el) => (
                    <span
                        className={`p-2 cursor-pointer px-4 ${
                            activeTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'
                        }`}
                        onClick={() => setActiveTab(el.id)}
                        key={el.id}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="w-full h-[300px] border  mb-2 p-4">
                {productInfoTabs.some((el) => el.id === activeTab) &&
                    productInfoTabs.find((el) => el.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default memo(ProductInformation);
