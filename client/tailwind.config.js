/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            width: {
                main: '1220px',
            },
            backgroundColor: {
                main: '#ee3131',
            },
            colors: {
                main: '#ee3131',
            },
            fontFamily: {
                main: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
