import {
  makeStyles,
  createStyles,
  Icon,
  Tab,
  Tabs,
  Theme,
  AppBar,
  Box,
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
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      // height: '66px',
      zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
      display: 'flex',
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
      display: 'flex',
      width: '100%',
      placeContent: 'flex-end',
      alignItems: 'center',
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
    },

    // Tabs wrapper
    tabsRoot: {
      height: '100%',
    },

    // Tab items
    tabRoot: {
      padding: '0',
      width: '203px',
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

    // Account button icon
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
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {logo}
          <Box className={classes.box}>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              classes={{
                root: classes.tabsRoot,
              }}
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
            {/* Account probably */}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
