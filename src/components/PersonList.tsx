import {
  createStyles,
  withStyles,
  makeStyles,
  Table,
  TableContainer,
  TableRow,
  Theme,
  TableHead,
  TableCell,
  TableBody,
} from '@material-ui/core';
import React from 'react';
import { IPerson } from '../interfaces/IPerson';

interface Props {
  people: IPerson[];
}

const CustomTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
    },
    root: {
      borderColor: theme.palette.divider,
    },
  }),
)(TableCell);

const CustomTableRow = withStyles((theme: Theme) =>
  createStyles({
    head: {},
  }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: '700px',
    },
  }),
);

const columns: string[] = ['Name', 'Birth data', 'Gender', 'Home world'];

export default function PersonList({ people }: Props) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <CustomTableCell id={col}>{col}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <CustomTableRow key={person.name}>
              <CustomTableCell>{person.name}</CustomTableCell>
              <CustomTableCell>{person.birth_year}</CustomTableCell>
              <CustomTableCell>{person.gender}</CustomTableCell>
              <CustomTableCell>{person.homeworld}</CustomTableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
