import React from 'react';
import { IPerson } from '../interfaces/IPerson';

interface Props {
  people: IPerson[];
}

export default function PersonList({ people }: Props) {
  return (
    <ul>
      {people.map((person, index) => (
        <li key={index}>{person.name}</li>
      ))}
    </ul>
  );
}
