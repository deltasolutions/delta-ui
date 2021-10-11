/** @jsx jsx */
import { Meta } from '@storybook/react';
import * as R from 'restyler';
import { jsx } from 'theme-ui';
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
