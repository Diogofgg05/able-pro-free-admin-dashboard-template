// ==============================|| OVERRIDES - TOOLTIP ||============================== //

import { Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';

export default function Tooltip(theme: Theme): Components {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.background.paper
        }
      }
    }
  };
}