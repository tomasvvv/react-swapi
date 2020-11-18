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
import { ITab } from '../interfaces/ITab';
import './sidebar.css';

interface Props {
  tabs?: ITab[];
  activeTab?: number;
  setActiveTab?: Function;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Sidebar({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
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
