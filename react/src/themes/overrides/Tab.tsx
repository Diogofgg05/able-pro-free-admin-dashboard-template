// ==============================|| OVERRIDES - TAB ||============================== //

import { Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';

export default function Tab(theme: Theme): Components {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.text.primary,
          borderRadius: 4,
          '&:hover': {
            color: theme.palette.primary.main
          },
          '&:focus-visible': {
            borderRadius: 4,
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: -3
          },
          '& svg.MuiTab-iconWrapper': {
            width: 18,
            height: 18
          }
        }
      }
    }
  };
}