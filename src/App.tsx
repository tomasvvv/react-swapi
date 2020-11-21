import {
  CssBaseline,
  MuiThemeProvider,
  makeStyles,
  createStyles,
  Theme,
  Input,
  InputAdornment,
  Toolbar,
  Paper,
  Typography,
  Container,
  Box,
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
      minHeight: '100vh',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    main: {
      width: '100%',
      display: 'block',
    },
    contentBox: {
      padding: theme.spacing(3),
      height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      borderColor: '#c4c4c4',
      borderRadius: '15px',
      padding: theme.spacing(3),

      minWidth: 800,
      [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        maxWidth: '100%',
      },
    },

    inputWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    input: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
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

  // Given attributes will be compared (lowercase) with input text (lowercase)
  const filterAttributes: (keyof IPerson)[] = ['gender', 'name', 'birth_year', 'homeworld'];

  const handleChange = (prop: keyof IInputState) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;
    setInputs({ ...inputs, [prop]: value });

    if (prop !== 'search') return;
    setFilteredPeople(
      people.filter((person) => {
        return filterAttributes.find((atr) =>
          person[atr].toLowerCase().includes(value.toLowerCase()),
        );
      }),
    );
  };

  // API results
  const [people, setPeople] = useState<IPerson[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<IPerson[]>([]); // subset of people

  const fetchPeople = () => {
    fetch('https://swapi.dev/api/people?limit=8', { headers: { origin: '' } })
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
              setPeople([...people]);
              setFilteredPeople(people);
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
        <main className={classes.main}>
          <Toolbar />
          <Container className={classes.contentBox}>
            <Paper variant="outlined" className={classes.paper}>
              <Typography align="center" variant="h4">
                Star wars
              </Typography>
              <Typography align="center" variant="subtitle1">
                Star wars heroes from swapi api
              </Typography>

              <Box className={classes.inputWrapper}>
                <Input
                  id="search"
                  value={inputs.search}
                  className={classes.input}
                  placeholder="Search..."
                  onChange={handleChange('search')}
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                />
              </Box>
              <PersonList people={filteredPeople} />
            </Paper>
          </Container>
        </main>
      </div>
    </MuiThemeProvider>
  );
}
