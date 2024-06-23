const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS__CATEGORY: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQs: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',
    DETAIL_CART: 'chi-tiet-gio-hang',
    CHECKOUT: 'checkout',
    CONTACT: 'lien-he',
    PRODUCTS: 'tat-ca-san-pham',

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
    MY_CART: 'gio-hang-cua-toi',
    HISTORY: 'lich-su-mua-hang',
    WISHLIST: 'san-pham-yeu-thich',
};

export default path;
