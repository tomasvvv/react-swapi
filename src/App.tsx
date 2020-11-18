import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { InsertDriveFile, PostAdd } from '@material-ui/icons';
import React, { useState } from 'react';
import './App.css';

import mainTheme from './themes/main';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ITab } from './interfaces/ITab';

export default function App(): JSX.Element {
  const tabs: ITab[] = [
    { title: 'First tab', icon: <InsertDriveFile/> },
    { title: 'Second tab', icon: <PostAdd/> },
  ];
  const [activeTab, setActiveTab] = useState<number>(0); // tabs index

  const sidebarTabs: ITab[] = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }];
  const [activeSidebarTab, setActiveSidebarTab] = useState<number>(0); // sidebarTabs index

  return (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className="App">
        <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Sidebar
          tabs={sidebarTabs}
          activeTab={activeSidebarTab}
          setActiveTab={setActiveSidebarTab}
        />
      </div>
    </MuiThemeProvider>
  );
}
