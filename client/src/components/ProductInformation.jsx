import React, { memo, useCallback, useState } from 'react';
import { productInfoTabs } from '../utils/contants';
import { Votebar } from '../components';
import { reanderStartFromNumber } from '../utils/helper';
import { Button, VoteOption, Comment } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/app/appSlice';
import { apiRatings } from '../apis';
import Swal from 'sweetalert2';
import path from '../utils/path';
import { useNavigate } from 'react-router-dom';

const ProductInformation = ({ totalRatings, ratings, nameProduct, pid, reRender }) => {
    const [activeTab, setActiveTab] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.user);
    const [payload, setPayload] = [
        {
            comment: '',
            score: '',
        },
    ];

    const handleSubmitVoteOption = async ({ comment, score }) => {
        if (!comment || !pid || !score) {
            alert('Vui lòng nhập đầy đủ thông tin trước khi xác nhận');
            return;
        }

        await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        reRender();
    };

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Bạn phải đăng nhập để nhận xét',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Trở về trang đăng nhập',
                title: 'oops',
                showCancelButton: true,
            }).then((rs) => {
                if (rs.isConfirmed) {
                    navigate(`/${path.LOGIN}`);
                }
            });
        } else {
            dispatch(
                showModal({
                    isShowModal: true,
                    modalChildren: (
                        <VoteOption nameProduct={nameProduct} handleSubmitVoteOption={handleSubmitVoteOption} />
                    ),
                }),
            );
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2 relative bottom-[-1px] ">
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
                <div
                    className={`p-2 cursor-pointer px-4 ${
                        activeTab === 5 ? 'bg-white border border-b-0' : 'bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(5)}
                >
                    Đánh giá khách hàng
                </div>
            </div>
            <div className="w-full h-[300px] border mb-2 p-4">
                {productInfoTabs.some((el) => el.id === activeTab) &&
                    productInfoTabs.find((el) => el.id === activeTab)?.content}
                {activeTab === 5 && (
                    <div className="flex p-4 flex-col">
                        <div className="flex">
                            <div className="flex-4 flex-col flex border-red-500 border items-center justify-center">
                                <span className="font-semibold text-3xl ">{`${totalRatings}/5`}</span>
                                <span className="flex items-center gap-1">
                                    {reanderStartFromNumber(totalRatings)?.map((el, index) => (
                                        <span key={index}>{el}</span>
                                    ))}
                                </span>
                                <span className="text-sm">{`${ratings?.length} reviewers and comments`}</span>
                            </div>
                            <div className="flex-6 flex flex-col border p-4 gap-2">
                                {Array.from(Array(5).keys())
                                    .reverse()
                                    .map((el) => (
                                        <Votebar
                                            key={el}
                                            number={el + 1}
                                            ratingCount={ratings?.filter((i) => i.star === el + 1)?.length}
                                            ratingTotal={ratings?.length}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-center text-sm gap-2">
                            <span>Bạn có muốn đánh giá sản phẩm?</span>
                            <Button handleOnClick={handleVoteNow}>Đánh giá ngay</Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {ratings?.map((el) => (
                                <Comment
                                    name={`${el?.postedBy?.firstname} ${el.postedBy.lastname}`}
                                    key={el._id}
                                    star={el.star}
                                    updatedAt={el.updatedAt}
                                    comment={el.comment}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ProductInformation);
