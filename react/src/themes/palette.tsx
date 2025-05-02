// material-ui
import { alpha, createTheme, PaletteMode, ThemeOptions } from '@mui/material/styles';

// project-imports
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

// Primeiro, estendemos o tipo PaletteColor para incluir nossas propriedades customizadas
interface CustomPaletteColor extends PaletteColor {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  [key: number]: string; // Para tons como 100, 200, etc.
}

interface PaletteConfig {
  mode: PaletteMode;
  presetColor: string;
}

interface CustomPalette extends ThemeOptions {
  palette: {
    mode: PaletteMode;
    common: {
      black: string;
      white: string;
    };
    primary: CustomPaletteColor;
    secondary: CustomPaletteColor;
    error: CustomPaletteColor;
    warning: CustomPaletteColor;
    info: CustomPaletteColor;
    success: CustomPaletteColor;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    action: {
      disabled: string;
      disabledBackground?: string;
    };
    divider: string;
    background: {
      paper: string;
      default: string;
    };
  };
}

const Palette = ({ mode, presetColor }: PaletteConfig) => {
  const paletteColor = ThemeOption(presetColor, mode);

  // Garantimos que todas as cores necessárias existam
  const secondary = paletteColor.secondary as CustomPaletteColor;

  const themeOptions: CustomPalette = {
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff',
      },
      ...paletteColor,
      text: {
        primary: mode === 'dark' ? secondary[100] : secondary[800],
        secondary: secondary.main,
        disabled: secondary[400],
      },
      action: {
        disabled: secondary.light,
        disabledBackground: mode === 'dark' ? alpha(secondary.light, 0.12) : undefined,
      },
      divider: alpha(secondary.light, mode === 'dark' ? 0.12 : 0.65),
      background: {
        paper: mode === 'dark' ? secondary[800] : '#fff',
        default: mode === 'dark' ? secondary[900] : secondary.lighter,
      },
    },
  };

  return createTheme(themeOptions);
};

export default Palette;