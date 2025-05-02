// ==============================|| OVERRIDES - TOGGLE BUTTON ||============================== //

import { Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';

export default function ToggleButton(theme: Theme): Components {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '& svg': {
            width: 18,
            height: 18
          },
          '&.Mui-disabled': {
            borderColor: theme.palette.divider,
            color: theme.palette.text.disabled
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }
      }
    }
  };
}