import React, { useCallback, useState, useEffect } from 'react';
import { InputForm, Select, Button, MarkdownEditor } from 'components';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { validate, getBase64 } from '../../utils/helper';
import { toast } from 'react-toastify';
import { IoTrashBinSharp } from 'react-icons/io5';
import { apiCreateProduct } from '../../apis/product';
import Skeleton from 'react-loading-skeleton';

const CreateProduct = () => {
    const { categories } = useSelector((state) => state.app);
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });
    const [hoverElm, setHoverElm] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();

    const [payload, setPayload] = useState({
        description: '',
    });
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
        const thumb = watch('thumb')?.[0];
        if (thumb) {
            handlePreviewThumb(thumb);
        }
    }, [watch('thumb')]);

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
        const images = watch('images');
        if (images && images.length > 0) {
            handlePreviewImage(images);
        }
    }, [watch('images')]);

    const handleRemoveImage = (name) => {
        const files = [...watch('images')];
        reset({
            images: files?.filter((el) => el.name !== name),
        });

        if (preview?.images?.some((el) => el.name === name))
            setPreview((prev) => ({ ...prev, images: prev.images?.filter((el) => el.name !== name) }));
    };

    const handleCreateProduct = async (data) => {
        setLoading(true); // Bắt đầu loading
        const invalids = validate(payload, setInvalidField);
        if (invalids === 0) {
            if (data?.category) {
                const categoryTitle = categories.find((el) => el._id === data.category)?.title;
                const finalPayload = { ...data, ...payload, category: categoryTitle };
                console.log(finalPayload);
                const formData = new FormData();
                for (let [key, value] of Object.entries(finalPayload)) {
                    if (key === 'thumb') {
                        formData.append(key, value[0]);
                    } else if (key === 'images') {
                        for (let image of value) {
                            formData.append(key, image);
                        }
                    } else {
                        formData.append(key, value);
                    }
                }
                const response = await apiCreateProduct(formData);
                if (response.success) {
                    toast.success('Tạo sản phẩm thành công');
                    reset();
                    setPayload({
                        description: '',
                    });
                    setPreview({
                        thumb: null,
                        images: [],
                    });
                } else {
                    toast.error('Tạo sản phẩm thất bại');
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className={`w-full ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
            <h1 className="text-xl lg:text-3xl font-semibold mb-6 border-b pb-4">Thêm mới sản phẩm</h1>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label="Tên sản phẩm"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{ require: 'Bạn phải nhập trường này' }}
                        fullWidth
                        placeholder="Tên sản phẩm"
                    />
                    <div className="w-full my-6 flex flex-col md:flex-row gap-4">
                        <InputForm
                            label="Giá"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            className="flex-1"
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
                            className="flex-1"
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
                            className="flex-1"
                            placeholder="Màu sắc sản phẩm"
                            fullWidth
                        />
                    </div>
                    <div className="w-full my-6 gap-4 flex flex-col md:flex-row">
                        <Select
                            label="Danh mục"
                            options={categories?.map((el) => ({ code: el?._id, value: el?.title }))}
                            register={register}
                            id="category"
                            validate={{ require: 'Bạn phải nhập trường này' }}
                            className="flex-auto"
                            errors={errors}
                            fullWidth
                        />

                        <Select
                            label="Thương hiệu (không bắt buộc)"
                            options={categories
                                ?.find((el) => el._id === watch('category'))
                                ?.brand?.map((el) => ({ code: el, value: el }))}
                            register={register}
                            id="brand"
                            className="flex-auto"
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
                    />
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
                        {errors['images'] && (
                            <small className="text-xs text-red-500">{errors['images']?.message}</small>
                        )}
                    </div>
                    {preview.images.length > 0 && (
                        <div className="my-4 flex w-full gap-3 flex-wrap">
                            {preview.images.map((el, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoverElm(el.name)}
                                    className="w-fit relative"
                                    onMouseLeave={() => setHoverElm(null)}
                                >
                                    <img src={el.path} alt="product" className="w-[200px] object-contain" />
                                    {hoverElm === el.name && (
                                        <div
                                            onClick={() => handleRemoveImage(el.name)}
                                            className="cursor-pointer flex items-center justify-center absolute animate-scale-up-center inset-0 bg-overplay"
                                        >
                                            <IoTrashBinSharp size={24} color="white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-8">
                        <Button type="submit">Thêm mới sản phẩm</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
