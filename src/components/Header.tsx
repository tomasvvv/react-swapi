import { makeStyles, createStyles, Icon, Tab, Tabs, Theme, AppBar, Container, Box } from '@material-ui/core';
import React from 'react';
import { ITab } from '../interfaces/ITab';
import { ReactComponent as Logo } from '../assets/icon.svg';
import { AccountCircle } from '@material-ui/icons';

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
      height: '66px'
    },

    // Logo
    iconRoot: {
      textAlign: 'center'
    },
    iconImg: {
      display: 'flex',
      height: 'inherit',
      width: 'inherit'
    },

    box: {
      display: 'flex',
      width: '100%',
      placeContent: 'flex-end',
      alignItems: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      maxWidth: '1440px'
    },
    
    // Tabs wrapper
    tabsRoot: {
      height: '100%'
    },

    // Tab items
    tabRoot: {
      padding: '0',
      width: '203px',
      marginLeft: '36px',
    },
    tabIconLabelWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontSize: '16px',
      alignItems: 'end'
    },
    tabIcon: {
      marginRight: '8px',
    },

    // Account button icon
    accountButton: {
      marginLeft: '10px'
    }
  })
);

export default function Header({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  const classes = useStyles();

  const logo = (
    <Icon classes={{ root: classes.iconRoot }}>
      <img className={classes.iconImg} src='../assets/logo.svg' alt='logo'/>
    </Icon>
  );

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setActiveTab(newValue);
  }

  return (
    <AppBar className={classes.appBar}>
      <Container className={classes.container}>
        {logo}
        <Box className={classes.box}>
          <Tabs
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            classes={{
              root: classes.tabsRoot
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabIconLabelWrapper
                }}
                label={tab.title}
                icon={
                  tab.icon && React.cloneElement(
                    tab.icon, 
                    { className: classes.tabIcon }
                  )
                }
              />
            ))}
          </Tabs> 
          <AccountCircle className={classes.accountButton} color='primary' /> {/* Account probably */}
        </Box>
      </Container>
    </AppBar>
  );
}
