import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Public, FAQ, Services, DetailProduct, Blog, Product, FinalRegister } from './pages/public';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import { getCategories } from './store/app/asyncAction';

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
                </Route>
                <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
                <Route path={path.LOGIN} element={<Login />}></Route>
            </Routes>
        </div>
    );
}

export default App;
