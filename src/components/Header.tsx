import {
  makeStyles,
  createStyles,
  Icon,
  Tab,
  Tabs,
  Box,
  Theme,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import { ITab } from '../interfaces/ITab';
import { AccountCircle } from '@material-ui/icons';
import { ReactComponent as Logo } from '../assets/logo.svg';

interface Props {
  tabs: ITab[];
  activeTab: number;
  setActiveTab: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.secondary.main,
      zIndex: theme.zIndex.drawer + 1,
      width: '100%',
    },

    // Logo
    iconRoot: {
      height: '100%',
      width: 'fit-content',
      display: 'flex',
      alignItems: 'center',
    },

    box: {
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      placeContent: 'flex-end',
      alignItems: 'center',
    },

    // Tab items
    tabRoot: {
      width: '200px',
      paddingLeft: '0',
      marginLeft: '36px',
      minHeight: theme.mixins.toolbar.minHeight,
    },
    tabIconLabelWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontSize: '16px',
      alignItems: 'end',
    },
    tabIcon: {
      marginRight: '8px',
    },

    // Account icon
    accountButton: {
      marginLeft: '10px',
    },
  }),
);

export default function Header({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  const classes = useStyles();

  const logo = (
    <Icon classes={{ root: classes.iconRoot }}>
      <Logo />
    </Icon>
  );

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setActiveTab(newValue);
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {logo}
          <Box className={classes.box}>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              variant="scrollable"
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  classes={{
                    root: classes.tabRoot,
                    wrapper: classes.tabIconLabelWrapper,
                  }}
                  label={tab.title}
                  icon={tab.icon && React.cloneElement(tab.icon, { className: classes.tabIcon })}
                />
              ))}
            </Tabs>
            <AccountCircle className={classes.accountButton} color="primary" />{' '}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
