/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                lightGrayishBlue: "#f7f8fc",
                violetBlue: "#6674cc",
                blackWith18: "#00000018",
                blackWith44: "#00000044",
            },
            fontFamily: {
                rubik: ["Rubik", "sans-serif"],
            },
            screens: {
                xsm: "340px",
            },
            transitionProperty: {
                progress: "width, background-color",
            },
            animation: {
                topdown: "topdown 6s linear infinite",
            },
            keyframes: {
                topdown: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(6px)" },
                },
            },
        },
    },
    plugins: [],
};
