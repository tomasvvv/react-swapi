import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

import React, { useState } from 'react';
import { IPerson } from '../interfaces/IPerson';
import { sort, SortOrder, getComparator } from '../sort';

const CustomTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '13px 0 13px 0',
      borderColor: theme.palette.divider,
    },
    head: {
      fontWeight: 'bold',
      padding: '9px 0 9px 0',
      '&:hover': {
        pointer: 'cursor',
      },
    },
  }),
)(TableCell);

interface Column {
  title: string;
  key: keyof IPerson;
}

const columns: Column[] = [
  { title: 'Name', key: 'name' },
  { title: 'Birth data', key: 'birth_year' },
  { title: 'Gender', key: 'gender' },
  { title: 'Home world', key: 'homeworld' },
];

interface TableHeadProps {
  sortBy: keyof IPerson;
  sortOrder: SortOrder;
  requestSort: (key: keyof IPerson) => void;
}

const CustomTableHead = ({ sortBy, sortOrder, requestSort }: TableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((c) => (
          <CustomTableCell key={c.key} width="125px">
            <TableSortLabel
              active={sortBy === c.key}
              onClick={() => requestSort(c.key)}
              direction={sortBy === c.key ? sortOrder : 'asc'}
            >
              {c.title}
            </TableSortLabel>
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 735,
      overflow: 'auto',
    },
  }),
);

interface Props {
  people: IPerson[];
}

export default function PersonList({ people }: Props) {
  const classes = useStyles();

  const [sortBy, setSortBy] = useState<keyof IPerson>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSortRequest = (key: keyof IPerson) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  return (
    <TableContainer>
      <Table className={classes.table}>
        <CustomTableHead sortBy={sortBy} sortOrder={sortOrder} requestSort={handleSortRequest} />
        <TableBody>
          {sort(people, getComparator(sortOrder, sortBy)).map((person) => (
            <TableRow key={person.name}>
              <CustomTableCell>{person.name}</CustomTableCell>
              <CustomTableCell>{person.birth_year}</CustomTableCell>
              <CustomTableCell>{person.gender}</CustomTableCell>
              <CustomTableCell>{person.homeworld}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
