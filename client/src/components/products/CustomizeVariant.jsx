import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, InputForm } from 'components';
import { toast } from 'react-toastify';
import { getBase64 } from 'utils/helper';
import { apiAddVarriant } from 'apis';
import Swal from 'sweetalert2';

const CustomizeVariant = ({ customizeVariant, setCustomizeVariant, render }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [preview, setPreview] = useState({
        thumb: '',
        images: '',
    });

    useEffect(() => {
        reset({
            title: customizeVariant?.title,
            color: customizeVariant?.color,
            price: customizeVariant?.price,
        });
    }, [customizeVariant]);

    const handleAddVariant = async (data) => {
        if (data.color === customizeVariant.color) {
            Swal.fire('Oops!', 'Màu sắc phải khác với màu sắc sản phẩm gốc ', 'info');
        } else {
            const formData = new FormData();
            for (let i of Object.entries(data)) formData.append(i[0], i[1]);
            if (data.thumb) formData.append('thumb', data.thumb[0]);
            if (data.images) {
                for (let image of data.images) formData.append('images', image);
            }
            const response = await apiAddVarriant(customizeVariant._id, formData);
            if (response.success) {
                toast.success('Thêm biến thể thành công');
                reset();
                setPreview({ thumb: '', images: [] });
            } else {
                toast.error('Thêm biến thể thất bại');
            }
        }
    };

    const handlePreviewThumb = async (file) => {
        if (file) {
            const base64Thumb = await getBase64(file);
            setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
        }
    };

    const handlePreviewImage = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Định dạng file không hợp lệ');
                return;
            }
            const base64 = await getBase64(file);
            imagesPreview.push({ name: file.name, path: base64 });
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) {
            handlePreviewThumb(watch('thumb')[0]);
        }
    }, [watch('thumb')]);

    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImage(watch('images'));
        }
    }, [watch('images')]);
    return (
        <div className="w-full flex flex-col gap-4 relative mt-[80px]">
            Tạo biến thể sản phẩm
            <div className="p-4 border-b flex justify-between items-center fixed top-0 bg-gray-100">
                <h1 className="text-3xl whitespace-nowrap font-bold tracking-tight">Cập nhật sản phẩm</h1>
                <span
                    className="text-main hover:underline cursor-pointer ml-[900px] text-xl"
                    onClick={() => setCustomizeVariant(null)}
                >
                    Hủy
                </span>
            </div>
            <form action="" className="p-4 w-full flex flex-col gap-4" onSubmit={handleSubmit(handleAddVariant)}>
                <div className="flex items-center gap-4 w-full">
                    <InputForm
                        label="Tên biến thể"
                        register={register}
                        errors={errors}
                        id="title"
                        fullWidth
                        placeholder="Tên biến thể"
                        validate={{ require: 'Bạn phải nhập trường này' }}
                        style="flex-auto "
                    />
                    {/* <InputForm
                        label="Giá sản phẩm gốc"
                        register={register}
                        errors={errors}
                        id="price"
                        fullWidth
                        placeholder="Tên sản phẩm gốc"
                        readOnly
                        style="flex-auto   "
                        disabled={true}
                    />
                    <InputForm
                        label="Màu sản phẩm gốc"
                        register={register}
                        errors={errors}
                        id="color"
                        fullWidth
                        placeholder="Màu sản phẩm gốc"
                        readOnly
                        style="flex-auto "
                        disabled={true}
                    /> */}
                </div>
                <div className="flex items-center gap-4 w-full">
                    <InputForm
                        label="Giá biến thể"
                        register={register}
                        errors={errors}
                        id="price"
                        validate={{ require: 'Bạn phải nhập trường này' }}
                        fullWidth
                        placeholder="Giá biến thể"
                        type="number"
                        style="flex-auto"
                    />

                    <InputForm
                        label="Màu sắc của biến thể"
                        register={register}
                        errors={errors}
                        id="color"
                        validate={{ require: 'Bạn phải nhập trường này' }}
                        fullWidth
                        placeholder="Màu sắc của biến thể "
                        style="flex-auto"
                    />
                </div>
                <div className="flex flex-col gap-2 mt-8">
                    <label className="font-semibold" htmlFor="thumb">
                        Tải ảnh
                    </label>
                    <input type="file" id="thumb" {...register('thumb', { required: 'Vui lòng chọn ảnh' })} />
                    {errors['thumb'] && <small className="text-xs text-red-500">{errors['thumb']?.message}</small>}
                </div>
                {preview.thumb && (
                    <div className="my-4">
                        <img src={preview.thumb} alt="thumbnail" className="w-[200px] object-contain" />
                    </div>
                )}

                <div className="flex flex-col gap-2 mt-8">
                    <label className="font-semibold" htmlFor="product">
                        Tải nhiều ảnh
                    </label>
                    <input
                        type="file"
                        id="product"
                        multiple
                        {...register('images', { required: 'Vui lòng chọn ảnh' })}
                    />
                    {errors['images'] && <small className="text-xs text-red-500">{errors['images']?.message}</small>}
                </div>
                {preview.images.length > 0 && (
                    <div className="my-4 flex w-full gap-3 flex-wrap">
                        {preview.images.length > 0 && (
                            <div className="my-4 flex w-full gap-3 flex-wrap">
                                {preview.images.map((el, index) => (
                                    <div key={index} className="w-fit relative">
                                        <img src={el.path} alt="product" className="w-[200px] object-contain" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className="mt-8">
                    <Button type="submit">Thêm biến thể mới</Button>
                </div>
            </form>
        </div>
    );
};

export default memo(CustomizeVariant);
