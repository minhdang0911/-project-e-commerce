import React, { useEffect } from 'react';
import { Breakcrumb } from 'components';
import { useParams } from 'react-router-dom';

const Services = () => {
    const params = useParams();

    useEffect(() => {
        document.title = 'Dịch vụ';
    });

    return (
        <div className="container mx-auto p-4">
            <Breakcrumb title={params} />
            <div className="flex flex-col md:flex-row items-center mb-8">
                <img
                    src="https://cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163"
                    alt="Main"
                    className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 transition-transform transform hover:scale-105"
                />
                <div className="text-lg font-semibold text-center md:text-left md:w-1/2">
                    <p>
                        Quý khách chỉ có thể truy cập trực tiếp vào website cũng như được hưởng những quyền lợi từ những
                        dịch vụ do cung cấp sau khi đăng ký tài khoản tại đây. Chúng tôi khuyến cáo người dùng hãy tạo
                        tài khoản cá nhân với mật khẩu an toàn và duy nhất. Với tài khoản này cùng với những thông tin
                        được cung cấp, người dùng có thể dễ dàng hơn khi đặt hàng và sử dụng một số dịch vụ trên website
                        và dễ dàng quản lý thông tin cá nhân hơn.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="service-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711"
                        alt="Customizable Page"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-center mb-2">TERMS AND POLICIES</h3>
                    <p className="text-center text-gray-700">
                        Quý khách vui lòng đọc kỹ tất cả các Điều khoản và chính sách sử dụng website được chúng tôi nêu
                        bên dưới để đảm bảo quyền lợi của khách hàng khi sử dụng website cũng như các dịch vụ trên
                        website của chúng tôi. Đồng thời cũng lưu ý rằng, việc sử dụng website và mua sản phẩm của chúng
                        tôi trên giao diện website đồng nghĩa với việc và đã đồng ý tuân thủ các điều khoản và chính
                        sách của .
                    </p>
                </div>
                <div className="service-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656"
                        alt="Revolution Slider"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-center mb-2">SECURITY</h3>
                    <p className="text-center text-gray-700">
                        Website chúng tôi được bảo mật bằng mã hóa SSL. Để biết thêm thông tin chi tiết, xin vui lòng
                        liên hệ minhdang9a8@gmail.com
                    </p>
                </div>
                <div className="service-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677"
                        alt="Drag & Drop Page"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-center mb-2">PRIVACY POLICY</h3>
                    <p className="text-center text-gray-700">
                        Chính sách bảo mật của website cần tuân theo các điều khoản và các điều kiện pháp lý liên quan
                        đến bảo mật thông tin cá nhân. Vì vậy , khách hàng sử dụng website vui lòng chấp nhận và tôn
                        trọng chính sách bảo mật sẽ được nêu bên dưới. Nếu quý khách không đồng ý và tuân thủ chính sách
                        của chúng tôi, có quyền yêu cầu người dùng hạn chế sử dụng website để đảm bảo quyền lợi và sự an
                        toàn của thông tin cá nhân quý khách. Việc truy cập và sử dụng trang website chỉ dành cho nhu
                        cầu sử dụng cá nhân của quý khách, vì vậy mọi thông tin cá nhân chúng tôi thu thập được liệt kê
                        bên dưới chỉ nhằm cho mục đích hỗ trợ quá trình sử dụng dịch vụ và mua hàng trên website . Những
                        thông tin cá nhân của quý khách mà chúng tôi thu thập bao gồm: - Họ/Tên người dùng - Ngày sinh -
                        Giới tính - Địa chỉ Email - Số điện thoại - Địa chỉ thường trú
                    </p>
                </div>
                <div className="service-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656"
                        alt="Revolution Slider"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-center mb-2">NEWSLETTER</h3>
                    <p className="text-center text-gray-700">
                        Khi quý khách đã đăng ký nhận bản tin, đồng nghĩa với việc quý khách đã chấp nhận chúng tôi có
                        thể cung cấp cho bạn mọi thông tin qua email về tin tức và nội dung của website liên quan đến
                        sản phẩm và các chương trình của . Khi quý khách không còn nhu cầu nhận thông báo qua email, quý
                        khách có thể hủy nhận thông báo thông qua trang cá nhân của quý khách trên website bên dưới dòng
                        nhập địa chỉ email của quý khách hoặc liên hệ chúng tôi để được hỗ trợ tại minhdang9a8@gmail
                        Liên quan đến các bản tin qua email của chúng tôi, chúng tôi có thể sử dụng thông tin cá nhân
                        của người dùng để tạo hồ sơ ẩn danh nhằm mục đích nghiên cứu thị trường, quảng cáo hoặc nội dung
                        bản tin tùy chỉnh.
                    </p>
                </div>
                <div className="service-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677"
                        alt="Drag & Drop Page"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-center mb-2">PERSONAL INFORMATION</h3>
                    <p className="text-center text-gray-700">
                        Mọi thông tin cá nhân do người dùng cung cấp có thể được người dùng thay đổi thông qua trang
                        giao diện cá nhân sau khi đăng nhập, chúng tôi sẵn lòng cung cấp cho người dùng thông tin mà
                        chúng tôi thu thập từ họ qua email. Chỉ cần liên hệ qua minhdang9a8@gmail để được hỗ trợ.
                    </p>
                </div>
                <div className="service-item p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711"
                        alt="Customizable Page"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-center mb-2">RELATIONSHIP WITH CLIENTS</h3>
                    <p className="text-center text-gray-700">
                        Bằng cách xem, sử dụng / hoặc đặt hàng bất kỳ sản phẩm / dịch vụ nào từ website , quan hệ đối
                        tác pháp lý chính thức sẽ không được hình thành giữa chúng tôi và khách hàng. Một hợp đồng giao
                        hàng được thực hiện và được kết thúc sau khi đơn hàng được hoàn tất.Chúng tôi có quyền thực hiện
                        hành động pháp lý đối với cá nhân tuyên bố đã hợp tác với dựa trên các dịch vụ được cung cấp bởi
                        mà chưa có sự xác nhận chính thức từ chúng tôi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
