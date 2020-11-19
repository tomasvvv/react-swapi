import {
  Container,
  CssBaseline,
  MuiThemeProvider,
  makeStyles,
  createStyles,
  Theme,
  Paper,
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
    app: {
      minHeight: '100vh',
    },
    container: {},
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
      <CssBaseline />
      <div className={classes.app}>
        <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Sidebar
          tabs={sidebarTabs}
          activeTab={activeSidebarTab}
          setActiveTab={setActiveSidebarTab}
        />
        <main className={classes.content}>
          <h3>Labas</h3>
        </main>
      </div>
    </MuiThemeProvider>
  );
}
