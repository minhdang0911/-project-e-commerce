import React, { memo, useState, useEffect, useCallback } from 'react';
import { InputForm, Select, Button, MarkdownEditor } from 'components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { validate, getBase64 } from '../../utils/helper';
import { apiDeleteProduct, apiUpdateProduct } from '../../apis/product';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
    const { categories } = useSelector((state) => state.app);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });

    useEffect(() => {
        reset({
            title: editProduct.title || '',
            price: editProduct.price || '',
            quantity: editProduct.quantity || '',
            color: editProduct.color || '',
            category: editProduct.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',
        });
        setPayload({
            description:
                typeof editProduct?.description === 'object'
                    ? editProduct?.description?.join(',')
                    : editProduct?.description,
        });
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.image || [],
        });
    }, [editProduct]);

    const [payload, setPayload] = useState({
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [isFocusDescription, setIsFocusDesciption] = useState(false);

    const [invalidField, setInvalidField] = useState([]);
    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        [payload],
    );

    const handlePreviewThumb = async (file) => {
        if (file) {
            const base64Thumb = await getBase64(file);
            setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
        }
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

    const handlePreviewImage = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Định dạng file không hợp lệ');
                return;
            }
            const base64 = await getBase64(file);
            imagesPreview.push(base64);
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    console.log(preview);

    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidField);
        if (invalids === 0) {
            if (data.category) data.category = categories?.find((el) => el.title === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

            if (finalPayload.thumb)
                formData.append('thumb', finalPayload?.thumb?.length === 0 ? preview?.thumb : finalPayload?.thumb[0]);
            if (finalPayload.images) {
                const images = finalPayload?.images?.length === 0 ? preview.images : finalPayload.images;
                for (let image of images) formData.append('images', image);
            }
            const response = await apiUpdateProduct(formData, editProduct._id);

            if (response.success) {
                toast.success('Cập nhật sản phẩm thành công');
                reset();
                setPayload({
                    thumb: '',
                    image: [],
                });
            } else {
                toast.error('Cập nhật sản phẩm thất bại');
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 relative mt-[80px]">
            <div className="p-4 border-b flex justify-between items-center fixed top-0 bg-gray-100">
                <h1 className="text-3xl whitespace-nowrap font-bold tracking-tight">Cập nhật sản phẩm</h1>
                <span
                    className="text-main hover:underline cursor-pointer ml-[900px] text-xl"
                    onClick={() => setEditProduct(null)}
                >
                    Hủy
                </span>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
                    <InputForm
                        label="Tên sản phẩm"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{ require: 'Bạn phải nhập trường này' }}
                        fullWidth
                        placeholder="Tên sản phẩm"
                    />
                    <div className="w-full my-6 flex gap-4">
                        <InputForm
                            label="Giá"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            style="flex-1"
                            placeholder="Giá sản phẩm"
                            type="number"
                            fullWidth
                        />

                        <InputForm
                            label="Số lượng"
                            register={register}
                            errors={errors}
                            id="quantity"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            style="flex-1"
                            placeholder="Số lượng sản phẩm"
                            type="number"
                            fullWidth
                        />

                        <InputForm
                            label="Màu sắc"
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            style="flex-1"
                            placeholder="Màu sắc sản phẩm"
                            fullWidth
                        />
                    </div>
                    <div className="w-full my-6 gap-4 flex">
                        <Select
                            label="Danh mục"
                            options={categories?.map((el) => ({ code: el?.title, value: el?.title }))}
                            register={register}
                            id="category"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            style="flex-auto"
                            errors={errors}
                            fullWidth
                        />

                        <Select
                            label="Thương hiệu (không bắt buộc)"
                            options={categories
                                ?.find((el) => el.title === watch('category'))
                                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
                            register={register}
                            id="brand"
                            style="flex-auto"
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkdownEditor
                        name="description"
                        changeValue={changeValue}
                        label="Mô tả sản phẩm"
                        invalidField={invalidField}
                        setInvalidField={setInvalidField}
                        value={payload.description}
                        setIsFocusDesciption={setIsFocusDesciption}
                    />
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="thumb">
                            Tải ảnh
                        </label>
                        <input type="file" id="thumb" {...register('thumb')} />
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
                        <input type="file" id="product" multiple {...register('images')} />
                        {errors['images'] && (
                            <small className="text-xs text-red-500">{errors['images']?.message}</small>
                        )}
                    </div>
                    {preview.images.length > 0 && (
                        <div className="my-4 flex w-full gap-3 flex-wrap">
                            {preview.images.map((el, index) => (
                                <div key={index} className="w-fit relative">
                                    <img src={el} alt="product" className="w-[200px] object-contain" />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-8">
                        <Button type="submit">Cập nhật sản phẩm</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(UpdateProduct);
