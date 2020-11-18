import { makeStyles, SvgIcon } from '@material-ui/core';
import React from 'react';
import { Tab } from '../interfaces/Tab';
import { ReactComponent as Logo } from '../assets/icon.svg';
import { AccountCircle } from '@material-ui/icons';

interface Props {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: Function;
}

export default function Header({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  return (
    <header>
      {/* Logo */}
      <SvgIcon>
        <Logo />
      </SvgIcon>

      {/* Tabs */}
      {tabs.map((tab) => (
        <p>{tab.title}</p>
      ))}

      {/* Account */}
      <AccountCircle />
    </header>
  );
}
