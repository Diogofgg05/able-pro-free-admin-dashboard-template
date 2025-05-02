// project-imports
import getColors from 'utils/getColors';
import getShadow from 'utils/getShadow';
import { Theme } from '@mui/material/styles';

// Extend the Theme type to include customShadows
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      secondary: any;
      error: any;
      warning: any;
      info: any;
      success: any;
      primaryButton: any;
      secondaryButton: any;
      errorButton: any;
      warningButton: any;
      infoButton: any;
      successButton: any;
      primary: any;
    };
  }
  interface ThemeOptions {
    customShadows?: {
      secondary?: any;
      error?: any;
      warning?: any;
      info?: any;
      success?: any;
      primaryButton?: any;
      secondaryButton?: any;
      errorButton?: any;
      warningButton?: any;
      infoButton?: any;
      successButton?: any;
      primary?: any;
    };
  }
}
import { Components } from '@mui/material/styles/components';

// ==============================|| OVERRIDES - INPUT BORDER & SHADOWS ||============================== //

type ColorVariant = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

interface GetColorProps {
  variant: ColorVariant;
  theme: Theme;
}

function getColor({ variant, theme }: GetColorProps) {
  const colors = getColors(theme, variant);
  const { light } = colors;

  const shadows = getShadow(theme, variant);

  return {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: light
    },
    '&.Mui-focused': {
      boxShadow: shadows,
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: light
      }
    }
  };
}

// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme: Theme): Components {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: 14
        },
        notchedOutline: {
          borderColor: theme.palette.secondary.light, // Changed from [400] to .light
          ...(theme.palette.mode === 'dark' && { 
            borderColor: theme.palette.secondary.dark // Changed from [200] to .dark
          })
        },
        root: {
          '& svg': {
            color: theme.palette.secondary.main
          },
          ...getColor({ variant: 'primary', theme }),
          '&.Mui-error': {
            ...getColor({ variant: 'error', theme })
          }
        },
        inputSizeSmall: {
          padding: '10px 10px 10px 12px'
        },
        inputMultiline: {
          padding: 0
        },
        colorSecondary: getColor({ variant: 'secondary', theme }),
        colorError: getColor({ variant: 'error', theme }),
        colorWarning: getColor({ variant: 'warning', theme }),
        colorInfo: getColor({ variant: 'info', theme }),
        colorSuccess: getColor({ variant: 'success', theme })
      }
    }
  };
}