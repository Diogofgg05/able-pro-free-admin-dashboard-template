import PropTypes from 'prop-types';
import { JSX, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import navigation from 'menu-items';

// icons
import { ArrowRight2, Buildings2, Home3 } from 'iconsax-react';
import React from 'react';

// types
interface LinkItem {
  title: string;
  to: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  card?: boolean;
  custom?: boolean;
  divider?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  links?: LinkItem[];
  maxItems?: number;
  rightAlign?: boolean;
  separator?: React.ElementType;
  title?: boolean;
  titleBottom?: boolean;
  sx?: any;
}

const Breadcrumbs = ({
  card = false,
  custom = false,
  divider = false,
  heading,
  icon,
  icons,
  links,
  maxItems,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  sx,
  ...others
}: BreadcrumbsProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const [main, setMain] = useState<any>();
  const [item, setItem] = useState<any>();

  const iconSX = {
    marginRight: theme.spacing(0.75),
    marginLeft: 0,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  let customLocation = location.pathname;

  if (customLocation.includes('/components-overview/breadcrumbs')) {
    customLocation = '/apps/customer/customer-card';
  }

  useEffect(() => {
    navigation?.items?.map((menu: any) => {
      if (menu.type && menu.type === 'group') {
        if (menu?.url && menu.url === customLocation) {
          setMain(menu);
          setItem(menu);
        } else {
          getCollapse(menu);
        }
      }
      return false;
    });
  }, [customLocation]);

  const getCollapse = (menu: any) => {
    if (!custom && menu.children) {
      menu.children.forEach((collapse: any) => {
        if (collapse.type === 'collapse') {
          getCollapse(collapse);
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
      });
    }
  };

  const SeparatorIcon = separator;
  const separatorIcon = SeparatorIcon ? <SeparatorIcon size={12} /> : <ArrowRight2 size={12} />;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  if (main && main.type === 'collapse' && !main.breadcrumbs) {
    CollapseIcon = main.icon ? main.icon : Buildings2;
    mainContent = (
      <Typography
        component={Link}
        to={main.url}
        variant="body1"
        sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        color={window.location.pathname === main.url ? 'text.primary' : 'text.secondary'}
      >
        {icons && <CollapseIcon style={iconSX} />}
        {main.title}
      </Typography>
    );
    breadcrumbContent = (
      <MainCard
        border={card}
        sx={card === false ? { mb: 3, bgcolor: 'transparent', borderRadius: 0, overflow: 'visible', ...sx } : { mb: 3, ...sx }}
        {...others}
        content={card}
        boxShadow={false}
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={0.5}
        >
          <Grid item>
            <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
              <Typography
                component={Link}
                to="/"
                variant="body1"
                sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                {icons && <Home3 style={iconSX} />}
                {icon && !icons && <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />}
                {(!icon || icons) && 'home'}
              </Typography>
              {mainContent}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item sx={{ mt: card === false ? 0 : 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                {main.title}
              </Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  if ((item && item.type === 'item') || (item?.type === 'group' && item?.url) || custom) {
    itemTitle = item?.title;
    ItemIcon = item?.icon ? item.icon : Buildings2;

    itemContent = (
      <Typography variant="body1" color="text.primary" sx={{ display: 'flex', fontWeight: 500, alignItems: 'center' }}>
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );

    let tempContent = (
      <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
        <Typography
          component={Link}
          to="/"
          color="text.secondary"
          variant="h6"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          {icons && <Home3 style={iconSX} />}
          {icon && !icons && <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />}
          {(!icon || icons) && 'Home'}
        </Typography>
        {mainContent}
        {itemContent}
      </MuiBreadcrumbs>
    );

    if (custom && links && links.length > 0) {
      tempContent = (
        <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
          {links.map((link, index) => {
            CollapseIcon = link.icon ? link.icon : Buildings2;
            return (
              <Typography
                key={index}
                component={link.to ? Link : 'span'}
                to={link.to}
                variant="body1"
                sx={{
                  textDecoration: 'none',
                  fontWeight: link.to ? 400 : 500,
                  cursor: link.to ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center'
                }}
                color={link.to ? 'text.secondary' : 'text.primary'}
              >
                {React.isValidElement(link.icon) && React.cloneElement(link.icon as React.ReactElement<any>, { style: iconSX })}
                {link.title}
              </Typography>
            );
          })}
        </MuiBreadcrumbs>
      );
    }

    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={card === false ? { mb: 3, bgcolor: 'transparent', borderRadius: 0, overflow: 'visible', ...sx } : { mb: 3, ...sx }}
          {...others}
          content={card}
          boxShadow={false}
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={0.5}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {custom ? heading : item?.title}
                </Typography>
              </Grid>
            )}
            <Grid item>{tempContent}</Grid>
            {title && titleBottom && (
              <Grid item sx={{ mt: card === false ? 0 : 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {custom ? heading : item?.title}
                </Typography>
              </Grid>
            )}
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.object
};
