import {
  Drawer,
  List,
  Theme,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  makeStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { ITab } from '../interfaces/ITab';

interface Props {
  tabs?: ITab[];
  activeTab?: number;
  setActiveTab?: Function;
}

const drawerWidth = 200;

const CustomDivider = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#fff',
    },
  }),
)(Divider);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      width: `${drawerWidth}px`,
      flexShrink: 0,
    },
    drawerPaper: {
      width: `${drawerWidth}px`,
      backgroundColor: theme.palette.primary.main,
      paddingTop: theme.mixins.toolbar.minHeight,
    },

    // for content to be below app bar
    toolbar: theme.mixins.toolbar,

    list: {
      padding: '0',
    },

    listItem: {
      height: '42px',
      color: theme.palette.secondary.main,
      borderColor: '#fff',
    },
    selectedListItem: {
      color: theme.palette.primary.main,
    },

    listItemText: {
      textAlign: 'center',
    },
  }),
);

export default function Sidebar({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Toolbar />
      <CustomDivider />
      <List className={classes.list}>
        {tabs?.map((tab, index) => (
          <ListItem
            key={index}
            selected={activeTab === index}
            button
            onClick={() => setActiveTab && setActiveTab(index)}
            classes={{
              root: classes.listItem,
              selected: classes.selectedListItem,
            }}
            divider={true}
          >
            <ListItemText className={classes.listItemText} primary={tab.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
