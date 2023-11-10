import { extendTheme } from "@chakra-ui/react";
const breakpoints = {
  xs: "26em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const colorTheme = {
  breakpoints,
  colors: {
    lightGreen: "#B4FFDF",
    teal: "#00A4AE",
    purple: "#9968fa",
    orange: "#E27715",
    white: "#f5f6f8",
    black: "#141718",
  },
};

export default extendTheme(colorTheme);
