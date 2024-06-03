import React, { memo, useRef, useEffect, useState } from 'react';
import logo from '../assets/logo.JPG';
import { voteOptions } from '../utils/contants';
import icons from '../utils/icons';
import Button from './Button';
import { AiFillStar } from 'react-icons/ai';

const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
    const [chosenScore, setChosenScore] = useState(null);
    const [comment, setComment] = useState('');
    const [score, setScore] = useState(null);

    const modalRef = useRef();

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    return (
        <div ref={modalRef} className="bg-white w-[700px] gap-4  flex flex-col items-center justify-center">
            <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
            <h2 className="text-center text-medium text-lg">{`Đánh giá sản phẩm: ${nameProduct}`}</h2>
            <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                className="form-textarea w-full placeholder:italic placeholder:text-sm placeholder:text-gray-500"
                placeholder="nhập cảm nhận của bạn"
            ></textarea>
            <div className="w-full flex flex-col gap-4">
                <p>Bạn cảm thấy sản phẩm này như thế nào ?</p>
                <div className="flex items-center justify-center gap-4">
                    {voteOptions.map((el) => (
                        <div
                            onClick={() => {
                                setChosenScore(el.id);
                                setScore(el.id);
                            }}
                            key={el.id}
                            className="w-[100px] h-[100px] cursor-pointer hover:bg-gray-300 rounded-md bg-gray-200 p-4 flex items-center justify-center flex-col gap-2"
                        >
                            {Number(chosenScore) && chosenScore >= el.id ? (
                                <AiFillStar color="orange" />
                            ) : (
                                <AiFillStar color="gray" />
                            )}
                            <span className="whitespace-nowrap">{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnClick={() => handleSubmitVoteOption({ comment, score })} fw>
                Submit
            </Button>
        </div>
    );
};

export default memo(VoteOption);
