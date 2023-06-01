import { createTheme } from '@mui/material/styles';

import colors from 'helper/colors.sass';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
  palette: {
    green_light: createColor(colors['green-light']),
    red_light: createColor(colors['red-light']),
    blue_light: createColor(colors['blue-light']),
  },
  typography: {
    font_24_serif: {
      fontSize: 24,
      fontFamily: 'sans-serif',
      fontWeight: 500,
    },
    font_22_serif: {
      fontSize: 18,
      fontFamily: 'sans-serif',
      fontWeight: 500,
    },
    font_14_roboto: {
      fontSize: 14,
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    font_12_roboto: {
      fontSize: 12,
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    font_10_roboto: {
      fontSize: 10,
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    font_14_roboto_red: {
      fontSize: 14,
      color: colors['red-light'],
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    font_14_roboto_green: {
      fontSize: 14,
      color: colors['green-light'],
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    font_14_uppercase: {
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
});
