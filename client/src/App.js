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
    Product,
    FinalRegister,
    ResetPassword,
} from './pages/public';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import { getCategories } from './store/app/asyncAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <div className="min-h-screen  font-main ">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />}></Route>
                    <Route path={path.BLOGS} element={<Blog />}></Route>
                    <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />}></Route>
                    <Route path={path.FAQs} element={<FAQ />}></Route>
                    <Route path={path.FAQs} element={<FAQ />}></Route>
                    <Route path={path.OUR_SERVICES} element={<Services />}></Route>
                    <Route path={path.PRODUCTS} element={<Product />}></Route>
                    <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
                </Route>
                <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
                <Route path={path.LOGIN} element={<Login />}></Route>
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
