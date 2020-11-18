import { makeStyles, Paper, SvgIcon, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { ITab } from '../interfaces/ITab';
import { ReactComponent as Logo } from '../assets/icon.svg';
import { AccountCircle } from '@material-ui/icons';

interface Props {
  tabs: ITab[];
  activeTab: number;
  setActiveTab: Function;
}

export default function Header({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  const [value, setValue] = useState(1);
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <header>
      {/* Logo */}
      <SvgIcon>
        <Logo />
      </SvgIcon>

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Active" />
        <Tab label="Disabled" disabled />
        <Tab label="Active" />
      </Tabs>

      {/* Account */}
      <AccountCircle />
    </header>
  );
}
