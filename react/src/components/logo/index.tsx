import { Link } from 'react-router-dom';
import { SxProps } from '@mui/material';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import  APP_DEFAULT_PATH  from 'config';

// ==============================|| MAIN LOGO ||============================== //

interface LogoSectionProps {
  isIcon?: boolean;
  sx?: SxProps;
  to?: string;
}

export default function LogoSection({ isIcon = false, sx, to }: LogoSectionProps) {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={to || (APP_DEFAULT_PATH as unknown as string)}
      sx={sx}
    >
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  );
}