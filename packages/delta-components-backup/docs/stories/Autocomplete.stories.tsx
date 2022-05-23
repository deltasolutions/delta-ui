import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useState, useRef, ReactNode } from 'react';
import { Autocomplete, Box, Button, TextField } from '../../lib';
export default {
  title: 'Autocomplete',
  component: Autocomplete
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = args => {
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState<unknown[]>([]);
  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {}, [ref.current]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <Autocomplete
        onChange={values => {
          setValues(values);
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        inputProps={{
          value: inputValue,
          onChange: e => {
            setInputValue(e.target.value);
            if (
              data.some(datum =>
                datum
                  .toLocaleLowerCase()
                  .includes(e.target.value.toLocaleLowerCase())
              )
            ) {
              setIsOpen(true);
              return;
            }
            setIsOpen(false);
          },
          variant: 'contained',
          placeholder: 'Find something'
        }}
        values={values.map(i => ({
          value: i,
          id: i as string,
          render: ({ value, onRemove }) => (
            <Box>
              <Button onClick={onRemove} variant="contained" color="secondary">
                Delete: {value}
              </Button>
            </Box>
          )
        }))}
        suggestions={data
          .filter(
            datum =>
              datum.includes(inputValue.toLocaleLowerCase()) &&
              !Object.keys(values ?? {}).includes(datum)
          )
          .map((i, index) => ({
            value: i,
            id: i,
            ...(index === 5 && {
              render: ({ value, isActive }) => {
                return (
                  <Box
                    sx={{
                      cursor: 'default',
                      width: '100%',
                      paddingX: 4,
                      paddingY: 1,
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 4,
                      overflow: 'hidden',
                      ...(isActive && {
                        backgroundColor: 'white',
                        color: 'black'
                      }),
                      fontWeight: 900
                    }}
                  >
                    {value}
                  </Box>
                );
              }
            })
          }))}
        ref={ref}
      />
    </Box>
  );
};
const data = [
  '7383 Barrows Burg',
  '258 Quitzon Turnpike',
  '6602 Tremblay Plaza',
  '82192 Lonny Skyway',
  '09487 Vicente Viaduct',
  '6431 Jacobi Well',
  '51896 Kobe Wall',
  '58491 America Lane',
  '3006 Roberts Ferry',
  '40460 Bogan Mews',
  '175 Brakus Roads',
  '984 Ashlynn Flats',
  '04845 Layne Forks'
];
export const Basic = Template.bind({});

Basic.args = {};
