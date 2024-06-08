import React, { useCallback, useEffect, useState } from 'react';
import { CustomizeVariant, InputForm, Pagination } from 'components';
import { useForm } from 'react-hook-form';
import { apiGetProduct, apiDeleteProduct } from 'apis/product';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import UpdateProduct from './UpdateProduct';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { IoTrashBinSharp } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const ManageProduct = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useForm();
    const [products, setProducts] = useState(null);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [params] = useSearchParams();
    const [counts, setCounts] = useState(0);
    const [editProduct, setEditProduct] = useState(null);
    const [update, setUpdate] = useState(false);
    const [customizeVariant, setCustomizeVariant] = useState(null);
    const queryDebounce = useDebounce(watch('q'), 800);

    const render = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    const fetchProducts = async (params) => {
        const response = await apiGetProduct({ ...params, limit: 10 });
        if (response.success) {
            const newProducts = response.products.map((product, index) => ({
                ...product,
                originalIndex: params.page ? (params.page - 1) * 10 + index + 1 : index + 1,
            }));
            setProducts(newProducts);

            if (!queryDebounce) {
                setOriginalProducts(newProducts);
            }

            setCounts(response.counts);
        }
    };

    useEffect(() => {
        const searchParams = Object.fromEntries([...params]);
        if (queryDebounce) searchParams.q = queryDebounce;
        fetchProducts(searchParams);
    }, [params, queryDebounce, update]);

    const handleDeleteProduct = (pid) => {
        Swal.fire({
            title: 'Xóa sản phẩm ?',
            text: 'Bạn có muốn xóa sản phẩm này',
            icon: 'warning',
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) {
                    render();
                    toast.success('Xóa sản phẩm thành công');
                } else {
                    toast.error('Xóa sản phẩm thất bại');
                }
            }
        });
    };

    return (
        <div className="w-full flex flex-col gap-4 relative">
            {editProduct && (
                <div className="absolute inset-0 bg-gray-100 min-h-screen z-50">
                    <UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct} />
                </div>
            )}

            {customizeVariant && (
                <div className="absolute inset-0 bg-gray-100 min-h-screen z-50">
                    <CustomizeVariant
                        customizeVariant={customizeVariant}
                        render={render}
                        setCustomizeVariant={setCustomizeVariant}
                    />
                </div>
            )}
            <div className="h-[69px] w-full"></div>
            <div className="p-4 border-b w-full flex justify-between items-center fixed top-0 bg-gray-100">
                <h1 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h1>
            </div>
            <div className="flex w-full items-center justify-end px-4">
                <form className="w-[45%] ">
                    <InputForm id="q" register={register} errors={errors} fullWidth placeholder="Tìm kiếm sản phẩm" />
                </form>
            </div>
            <table className="table-auto">
                <thead>
                    <tr className="border bg-sky-500 text-white">
                        <th className="text-center">STT</th>
                        <th className="text-center">Hình ảnh</th>
                        <th className="text-center">Tên sản phẩm</th>
                        <th className="text-center">Thương hiệu</th>
                        <th className="text-center">Danh mục</th>
                        <th className="text-center">Giá</th>
                        <th className="text-center">Số lượng</th>
                        <th className="text-center">Đã bán</th>
                        <th className="text-center">Màu sắc</th>
                        <th className="text-center">Tổng đánh giá</th>
                        <th className="text-center">Tổng biến thể</th>
                        <th className="text-center">Ngày cập nhật</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((el) => {
                        const serialNumber =
                            originalProducts.find((prod) => prod._id === el._id)?.originalIndex || el.originalIndex;

                        return (
                            <tr className="border-b" key={el._id}>
                                <td className="text-center py-2">{serialNumber}</td>
                                <td className="text-center py-2">
                                    <img src={el.thumb} alt="thumb" className="w-12 h-12 object-cover" />
                                </td>
                                <td className="text-center py-2">{el.title}</td>
                                <td className="text-center py-2">{el.brand}</td>
                                <td className="text-center py-2">{el.category}</td>
                                <td className="text-center py-2">{el.price}</td>
                                <td className="text-center py-2">{el.quantity}</td>
                                <td className="text-center py-2">{el.sold}</td>
                                <td className="text-center py-2">{el.color}</td>
                                <td className="text-center py-2">{el.totalRatings}</td>
                                <td className="text-center py-2">{el?.varriants?.length}</td>
                                <td className="text-center py-2">{moment(el?.updatedAt).format('DD/MM/YYYY')}</td>
                                <td className="text-center py-2 flex mt-3">
                                    <span
                                        onClick={() => setEditProduct(el)}
                                        className="hover:text-orange-500 text-blue-500 hover:underline cursor-pointer px-1"
                                    >
                                        <FaEdit size={20} />
                                    </span>
                                    <span
                                        onClick={() => handleDeleteProduct(el._id)}
                                        className=" hover:text-orange-500text-blue-500 hover:underline cursor-pointer px-1"
                                    >
                                        <IoTrashBinSharp size={20} color="blue" />
                                    </span>

                                    <span
                                        onClick={() => setCustomizeVariant(el)}
                                        className=" hover:text-orange-500 text-blue-500 hover:underline cursor-pointer px-1"
                                    >
                                        {/* Thêm biến thể */}
                                        <MdOutlineDashboardCustomize size={20} />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="w-full flex justify-end my-8">
                <Pagination totalCount={counts} />
            </div>
        </div>
    );
};

export default ManageProduct;
