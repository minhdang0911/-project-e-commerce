import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Login,
    Home,
    Public,
    FAQ,
    Services,
    DetailProduct,
    Blog,
    Products,
    FinalRegister,
    ResetPassword,
} from './pages/public';
import { Adminlayout, Doashboard, CreateProduct, ManageOrder, ManageProduct, ManageUser } from './pages/admin';
import { MemberLayout, Personal, History, MyCart, Wishlist } from './pages/member';
import path from './utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './store/app/asyncAction';
import { Modal } from './components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from 'pages/public/NotFound';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const { isShowModal, modalChildren } = useSelector((state) => state.app);

    return (
        <div className="h-screen font-main ">
            {isShowModal && <Modal>{modalChildren}</Modal>}
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />}></Route>
                    <Route path={path.BLOGS} element={<Blog />}></Route>
                    <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
                    <Route path={path.FAQs} element={<FAQ />}></Route>
                    <Route path={path.OUR_SERVICES} element={<Services />}></Route>
                    <Route path={path.PRODUCTS} element={<Products />}></Route>
                    <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
                </Route>
                <Route path={path.ADMIN} element={<Adminlayout />}>
                    <Route path={path.DASHBOARD} element={<Doashboard />} />
                    <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
                    <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                    <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
                </Route>

                <Route path={path.MEMBER} element={<MemberLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                    <Route path={path.HISTORY} element={<History />} />
                    <Route path={path.MY_CART} element={<MyCart id="cart" />} />
                    <Route path={path.WISHLIST} element={<Wishlist />} />
                </Route>
                <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
                <Route path={path.LOGIN} element={<Login />}></Route>
                {/* <Route path={Path} element={<NotFound />} /> */}
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
