import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/app/appSlice';

const Modal = ({ children }) => {
    const dispatch = useDispatch();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-overplay z-50 flex items-center justify-center"
        >
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white p-4 rounded">
                {children}
            </div>
        </div>
    );
};

export default memo(Modal);
