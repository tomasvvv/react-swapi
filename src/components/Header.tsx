import { makeStyles, createStyles, SvgIcon, Tab, Tabs, Theme, AppBar } from '@material-ui/core';
import React, { useState } from 'react';
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
      backgroundColor: '#ffffff'
    },
    logoSvg: {
      width: '100px',
      height: '100px'
    }
  })
);

export default function Header({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }
  

  return (
    <AppBar className={classes.appBar}>
      <SvgIcon className={classes.logoSvg}>
        <Logo />
      </SvgIcon>

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        {tabs.map(tab => (
          <Tab label={tab.title}/>
        ))}
      </Tabs>

      <AccountCircle />
    </AppBar>
  );
}
