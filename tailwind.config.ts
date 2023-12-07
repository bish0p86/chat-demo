import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark-green": "#03390f",
                "medium-ui": "#c2cdc4",
                "pale-green": "#cfff71",
                "dark-ui": "#869b89",
                "light-ui": "#e1e6e1",
                "pale-lime": "#f5ffdf",
                "medium-lime": "#ebfebf",
                "bright-lime": "#e2fea1",
            },
        },
    },
    plugins: [],
};
export default config;
