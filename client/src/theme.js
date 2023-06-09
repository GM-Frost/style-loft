import {createTheme} from '@mui/material/styles';

export const shades = {

primary: {
    100: "#dfdbf3",
    200: "#beb6e7",
    300: "#9e92da",
    400: "#7d6dce",
    500: "#5d49c2",
    600: "#4a3a9b",
    700: "#382c74",
    800: "#251d4e",
    900: "#130f27"
},
secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#d6001c",
    600: "#ab0016",
    700: "#800011",
    800: "#56000b",
    900: "#2b0006"
},
neutral: {
    100: "#faf1e3",
    200: "#f6e3c7",
    300: "#f1d6ac",
    400: "#edc890",
    500: "#e8ba74",
    600: "#ba955d",
    700: "#8b7046",
    800: "#5d4a2e",
    900: "#2e2517"
},
// neutral: {
//     100: "#f5f5f5",
//     200: "#ecebeb",
//     300: "#e2e1e1",
//     400: "#d9d7d7",
//     500: "#cfcdcd",
//     600: "#a6a4a4",
//     700: "#7c7b7b",
//     800: "#535252",
//     900: "#292929"
// },
};

export const theme = createTheme({
    palette: {
        primary:{
            main: shades.primary[500]
        },
        secondary:{
            main: shades.secondary[500]
        },
        neutral:{
            main: shades.neutral[500],
            dark: shades.neutral[700],
            light: shades.neutral[100]
        }
    },
    typography: {
        fontFamily:['Fauna One', 'sans-serif'].join(','),
        fontSize: 11,
        h1:{
            fontFamily:['Cinzel', 'sans-serif'].join(','),
            fontSize: 48,
        },
        h2:{
            fontFamily:['Cinzel', 'sans-serif'].join(','),
            fontSize: 36,
        },
        h3:{
            fontFamily:['Cinzel', 'sans-serif'].join(','),
            fontSize: 20,
        },
        h4:{
            fontFamily:['Cinzel', 'sans-serif'].join(','),
            fontSize: 14,
        },
    },
})