import { useContext, useMemo } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { Box, Button } from 'restyler';
import { jsx } from 'theme-ui';
import { DataTableContext } from '../DataTableContext';

export * from './Toolbar';

export const Tabs = () => {
  const {
    layout: { tabs },
    activeTabName,
    setActiveTabName,
    addTab,
    removeTab
  } = useContext(DataTableContext);
  const tabNames = tabs.map(v => v.name);
  const canAdd = tabs.length < 6;
  return useMemo(
    () => (
      <Box sx={{ display: 'flex', gap: 2, marginBottom: -3 }}>
        {tabNames.map((name, index) => {
          const isMain = name === mainTabName;
          const isActive = name === activeTabName;
          return (
            <Button
              key={name}
              sx={getTabStyle(isMain, isActive)}
              onClick={() => {
                isMain || !isActive
                  ? setActiveTabName(name ?? mainTabName)
                  : removeTab(name);
              }}
            >
              {isMain ? <IoHome /> : letters[index - 1]}
              <IoMdClose role="close" />
            </Button>
          );
        })}
        {canAdd && (
          <Button
            sx={getTabStyle(false, false)}
            onClick={() => addTab(getNewTabName())}
          >
            <IoMdAdd />
          </Button>
        )}
      </Box>
    ),
    [
      tabNames.join(),
      activeTabName,
      setActiveTabName,
      addTab,
      removeTab,
      canAdd
    ]
  );
};

const mainTabName = 'main';
const letters = new Array(26)
  .fill('')
  .map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
const getNewTabName = () => Math.random().toString().slice(-4);
const getTabStyle = (isMain: boolean, isActive: boolean) =>
  ({
    padding: 3,
    marginTop: -3,
    marginBottom: '-1px',
    border: '1px solid',
    borderColor: isActive ? 'border' : 'transparent',
    borderTopColor: isActive ? 'accentSurface' : 'transparent',
    borderBottomColor: isActive ? 'accentSurface' : 'transparent',
    backgroundColor: isActive ? 'accentSurface' : 'transparent',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    fontSize: 2,
    '&:hover': isActive
      ? isMain
        ? {}
        : {
            color: 'transparent',
            '& [role="close"]': { display: 'block' }
          }
      : { color: 'primary' },
    position: 'relative',
    '& svg': {
      width: '1.45em',
      height: '1.45em',
      verticalAlign: 'middle',
      '&[role="close"]': {
        display: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'primary'
      }
    }
  } as const);
