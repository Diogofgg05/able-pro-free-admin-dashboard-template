import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

// ==============================|| AUTHENTICATION - CARD ||============================== //

interface AuthSocButtonProps extends ButtonProps {
  children: ReactNode;
}

export default function AuthSocButton({ children, ...other }: AuthSocButtonProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        bgcolor: 'secondary.100',
        borderColor: 'secondary.200',
        color: 'secondary.main',
        '&:hover,&:focus': {
          bgcolor: 'secondary.100',
          borderColor: 'primary.main'
        }
      }}
      {...other}
    >
      {children}
    </Button>
  );
}