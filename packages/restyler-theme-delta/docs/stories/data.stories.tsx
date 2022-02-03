import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import * as R from 'restyler';
import { compact } from '../decorators';

export default {
  title: 'General/Data'
} as Meta;

export const Table = () => (
  <R.Table>
    <R.TableHead>
      <R.TableRow>
        <R.TableCell>#</R.TableCell>
        <R.TableCell>Name</R.TableCell>
        <R.TableCell>Age</R.TableCell>
      </R.TableRow>
    </R.TableHead>
    <R.TableBody>
      <R.TableRow>
        <R.TableCell>1</R.TableCell>
        <R.TableCell>John</R.TableCell>
        <R.TableCell>30</R.TableCell>
      </R.TableRow>
      <R.TableRow>
        <R.TableCell>2</R.TableCell>
        <R.TableCell>Rebecca</R.TableCell>
        <R.TableCell>25</R.TableCell>
      </R.TableRow>
      <R.TableRow>
        <R.TableCell>3</R.TableCell>
        <R.TableCell>Albert</R.TableCell>
        <R.TableCell>45</R.TableCell>
      </R.TableRow>
    </R.TableBody>
  </R.Table>
);
Table.decorators = [compact()];

export const PieChart = () => {
  return (
    <R.PieChart
      angleGap={0.1}
      data={[
        { value: 1, color: 'grey' },
        { value: 2, color: 'rebeccapurple' },
        { value: 3, color: 'green' }
      ]}
      radiusGap={0.7}
      sx={{ width: '200px', height: '200px' }}
    />
  );
};

export const PairList = () => {
  return (
    <R.PairList
      pairs={[
        ['Title 1', 'A'],
        ['Title 2', 'Ufjeisua nf'],
        {
          title: 'Title 3',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
            'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
            'ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          kind: 'expanded'
        },
        ['Title 4', 'D']
      ]}
    />
  );
};
PairList.decorators = [compact()];
