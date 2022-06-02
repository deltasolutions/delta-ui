import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  useEffect,
  useState,
  useRef,
  ReactNode,
  InputHTMLAttributes,
} from 'react';
import { Autocomplete, Box, Button, TextField } from '../../lib';
import { AutocompleteOption } from '../../lib/components/Autocomplete/AutocompleteOption';
export default {
  title: 'Autocomplete',
  component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>;
const Template: ComponentStory<typeof Autocomplete> = args => {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState<(string | number)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLabelElement>(null);
  const options = [
    { key: '1', value: 'First' },
    { key: '2', value: 'Second' },
    { key: '3', value: 'Third' },
  ];
  useEffect(() => {}, [ref.current]);
  console.log('hook.value', value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Autocomplete
        inputProps={{
          variant: 'contained',
          placeholder: 'Find something',
          style: { width: '300px' },
        }}
        query={query}
        onQuery={query => {
          setQuery(query);
          setIsOpen(true);
        }}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onChange={value => {
          console.log('value', value);

          setValue(value);
          setIsOpen(false);
        }}
        value={value}
      >
        {options
          .filter(({ key }) => {
            console.log(key, value);

            return (
              key.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
              !Object.keys(value).includes(key)
            );
          })
          .map(({ key, value }) => (
            <AutocompleteOption key={key} value={key}>
              {value}
            </AutocompleteOption>
          ))}
      </Autocomplete>
      {/* <Autocomplete
        onChange={value => {
          setValue(value);
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
          placeholder: 'Find something',
        }}
        value={value}
        options={data
          .filter(
            datum =>
              datum.includes(inputValue.toLocaleLowerCase()) &&
              !Object.keys(value ?? {}).includes(datum)
          )
          .map((i, index) => ({
            value: i,
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
                        color: 'black',
                      }),
                      fontWeight: 900,
                    }}
                  >
                    {value}
                  </Box>
                );
              },
            }),
          }))}
        ref={ref}
      /> */}
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
  '04845 Layne Forks',
];
export const Basic = Template.bind({});

Basic.args = {};
