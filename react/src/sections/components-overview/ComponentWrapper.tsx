// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material'; // Importa os tipos de props do Box

// ==============================|| COMPONENTS - WRAPPER ||============================== //

const ComponentWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  paddingLeft: theme.spacing(8),
  paddingTop: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(2.5),
    paddingRight: 0
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2)
  }
}));

export default ComponentWrapper;
