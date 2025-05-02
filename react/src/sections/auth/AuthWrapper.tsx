import { ReactNode } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const outerGridSx: SxProps = {
    justifyContent: 'center',
    minHeight: '100vh'
  };

  const innerGridSx: SxProps = {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: { 
      xs: 'calc(100vh - 210px)', 
      sm: 'calc(100vh - 134px)', 
      md: 'calc(100vh - 112px)' 
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Grid container sx={outerGridSx}>
        <Grid item xs={12} container sx={innerGridSx}>
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}