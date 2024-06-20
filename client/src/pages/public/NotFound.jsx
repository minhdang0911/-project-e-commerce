import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="py-10 bg-white min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0">
                        <div
                            className="bg-cover bg-center h-96 bg-no-repeat"
                            style={{
                                backgroundImage:
                                    'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                            }}
                        >
                            <h1 className="text-8xl text-center">404</h1>
                        </div>
                    </div>
                    <div className="md:w-1/2 lg:w-3/5 text-center md:text-left md:ml-10">
                        <div className="content">
                            <h3 className="text-4xl font-semibold mb-4">Không tìm thấy trang!</h3>
                            <p className="text-lg mb-6">Bạn có chắc chắn muốn ở đây không?</p>
                            <Link
                                to="/"
                                className="text-white bg-yellow-600 hover:bg-yellow-700 py-3 px-6 inline-block text-lg rounded-lg transition duration-300"
                            >
                                Trở lại
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
