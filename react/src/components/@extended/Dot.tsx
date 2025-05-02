import { SxProps, Theme } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

// project-imports
import getColors from 'utils/getColors';

// ==============================|| DOT - EXTENDED ||============================== //

interface DotProps {
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: number;
  variant?: string;
  sx?: SxProps<Theme>;
  componentDiv?: boolean;
}

export default function Dot({
  color,
  size,
  variant,
  sx,
  componentDiv
}: DotProps) {
  const theme = useTheme();
  const colors = getColors(theme, color || 'primary');
  const { main } = colors;

  return (
    <Box
      component={componentDiv ? 'div' : 'span'}
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : main,
        ...(variant === 'outlined' && { border: `1px solid `, borderColor: main }),
        ...sx
      }}
    />
  );
}

Dot.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  variant: PropTypes.string,
  sx: PropTypes.object,
  componentDiv: PropTypes.bool
};
