import {
  Typography,
  CssBaseline,
  MuiThemeProvider,
  makeStyles,
  createStyles,
  Theme,

  //
  ListItem,
  List,
  AppBar,
  Toolbar,
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { InsertDriveFile, PostAdd } from '@material-ui/icons';
import React, { useState } from 'react';

import mainTheme from './themes/main';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ITab } from './interfaces/ITab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

export default function App(): JSX.Element {
  const tabs: ITab[] = [
    { title: 'First tab', icon: <InsertDriveFile /> },
    { title: 'Second tab', icon: <PostAdd /> },
  ];
  const [activeTab, setActiveTab] = useState<number>(0); // tabs index

  const sidebarTabs: ITab[] = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }];
  const [activeSidebarTab, setActiveSidebarTab] = useState<number>(1); // sidebarTabs index

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Sidebar
          tabs={sidebarTabs}
          activeTab={activeSidebarTab}
          setActiveTab={setActiveSidebarTab}
        />
        <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
            viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
            sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
            In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
            sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
            viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </main>
      </div>
    </MuiThemeProvider>
  );
}
