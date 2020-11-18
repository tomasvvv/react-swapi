import {
  List,
  ListItem,
  ListItemText,
  Theme,
  makeStyles,
  createStyles,
  Container,
} from '@material-ui/core';
import React from 'react';
import { Tab } from '../interfaces/Tab';
import './sidebar.css';

interface Props {
  tabs?: Tab[];
  activeTab?: number;
  setActiveTab?: Function;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Sidebar({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  function tabClicked(index: number) {
    if (!setActiveTab) return;

    setActiveTab(index);
  }

  const classes = useStyles();

  return (
    <List classes={{ root: classes.root }} component="nav" aria-label="sidebar">
      {tabs?.map((tab, index) => (
        <ListItem>
          <ListItemText primary={tab.title} />
        </ListItem>
      ))}
    </List>
  );
}
