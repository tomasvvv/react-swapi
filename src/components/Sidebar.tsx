import {
  Drawer,
  List,
  Theme,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import React from 'react';
import { ITab } from '../interfaces/ITab';

interface Props {
  tabs?: ITab[];
  activeTab?: number;
  setActiveTab?: Function;
}

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      top: 'unset',
      backgroundColor: theme.palette.primary.main,
      paddingTop: '76px',
    },

    list: {
      width: `${drawerWidth}px`,
      height: '100%',
      padding: '0',
    },

    listItem: {
      height: '42px',
      color: theme.palette.secondary.main,
    },
    selectedListItem: {
      color: theme.palette.primary.main,
    },

    listItemText: {
      textAlign: 'center',
    },
    divider: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

export default function Sidebar({ tabs, activeTab, setActiveTab }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Divider className={classes.divider} />
      <List component="nav" className={classes.list}>
        {tabs?.map((tab, index) => (
          <>
            <ListItem
              classes={{
                root: classes.listItem,
                selected: classes.selectedListItem,
              }}
              key={index}
              selected={activeTab === index}
              button
              onClick={() => setActiveTab && setActiveTab(index)}
            >
              <ListItemText className={classes.listItemText} primary={tab.title} />
            </ListItem>
          </>
        ))}
        <Divider className={classes.divider} />
      </List>
    </Drawer>
  );
}
