import {
  CssBaseline,
  MuiThemeProvider,
  makeStyles,
  createStyles,
  Theme,
  Input,
  InputAdornment,
  Toolbar,
} from '@material-ui/core';
import { InsertDriveFile, PostAdd, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import mainTheme from './themes/main';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PersonList from './components/PersonList';
import { ITab } from './interfaces/ITab';
import { IInputState } from './interfaces/IInputState';
import { IPerson } from './interfaces/IPerson';

const proxy = ''; // https://cors-anywhere.herokuapp.com/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    inputMargin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function App(): JSX.Element {
  const classes = useStyles();

  // Appbar
  const tabs: ITab[] = [
    { title: 'First tab', icon: <InsertDriveFile /> },
    { title: 'Second tab', icon: <PostAdd /> },
  ];
  const [activeTab, setActiveTab] = useState<number>(0); // tabs index

  // Drawer
  const sidebarTabs: ITab[] = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }];
  const [activeSidebarTab, setActiveSidebarTab] = useState<number>(1); // sidebarTabs index

  // Inputs
  const [inputs, setInputs] = React.useState<IInputState>({
    search: '',
  });
  const handleChange = (prop: keyof IInputState) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;
    setInputs({ ...inputs, [prop]: value });

    if (prop !== 'search') return;
  };

  // API results
  const [people, setPeople] = useState<IPerson[]>([]);

  const fetchPeople = () => {
    fetch('https://swapi.dev/api/people', { headers: { origin: '' } })
      .then((res) => res.json())
      .then((res) => {
        res.results.map((person: any) => {
          return fetch(`${proxy}${person.homeworld}`)
            .then((hw) => hw.json())
            .then((hw) => {
              let newPerson = {
                name: person.name,
                birth_year: person.birth_year,
                gender: person.gender,
                homeworld: hw.name,
              };

              people.push(newPerson);
              setPeople(people);
            });
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Input
            id="search"
            value={inputs.search}
            placeholder="Search..."
            onChange={handleChange('search')}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />

          <PersonList people={people} />
        </main>
      </div>
    </MuiThemeProvider>
  );
}
