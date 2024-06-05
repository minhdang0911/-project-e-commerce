const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQs: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',

    //admin
    ADMIN: 'admin',
    DASHBOARD: 'thong-ke',
    MANAGE_USER: 'quan-ly-nguoi-dung',
    MANAGE_PRODUCTS: 'quan-ly-san-pham',
    MANAGE_ORDER: 'quan-ly-don-hang',
    CREATE_PRODUCT: 'them-san-pham',

    //member
    MEMBER: 'nguoi-dung',
    PERSONAL: 'ho-so-nguoi-dung',
};

export default path;
