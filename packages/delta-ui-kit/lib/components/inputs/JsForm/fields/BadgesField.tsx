import { jsx } from '@theme-ui/core';
import { FieldProps, hash, Schema, useDefaults } from 'delta-jsf';
import { HTMLAttributes, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { Button } from '../../../Button';
import { Box } from '../../../containers';
import { Tooltip } from '../../../Tooltip';
import { useArrayFieldHandlers, useJsFormModal } from '../hooks';

export const BadgesField = (props: FieldProps) => {
  useDefaults(props);
  const [t] = useTranslation('common');
  const {
    schema: { items: itemsSchema },
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  const { handleChange, handleAdd, handleDelete, values } =
    useArrayFieldHandlers(props);
  const openModal = useJsFormModal({
    schema: itemsSchema as Schema,
  });
  return (
    <PrimitiveTemplate {...props}>
      <Box
        sx={{
          marginBottom: 3,
          gap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {values?.map(datum => (
          <BadgeItem
            key={hash(datum)}
            colorMap={(itemsSchema as any)?.layout?.colorMap ?? []}
            value={datum}
            onClick={() =>
              openModal({
                initialValue: datum,
                onChange: v => handleChange(v, datum),
              })
            }
            onDelete={handleDelete}
          />
        ))}
        {handleAdd && (
          <Tooltip content={t('actions.add')}>
            <Button
              icon={IoIosAddCircleOutline}
              variant="icon"
              onClick={() => openModal({ onChange: handleAdd })}
            />
          </Tooltip>
        )}
      </Box>
    </PrimitiveTemplate>
  );
};

export interface BadgeItemProps extends HTMLAttributes<HTMLDivElement> {
  colorMap?: { [key: string]: any }[];
  maxLength?: number;
  onDelete?: (value: any) => void;
  value: any;
}

export const BadgeItem = (props: BadgeItemProps) => {
  const [t] = useTranslation('common');
  const { onDelete, value, maxLength = 15, colorMap, ...rest } = props;
  const transformedValue = useMemo(() => {
    if (Array.isArray(value)) {
      return value.join('|');
    }
    if (typeof value === 'object') {
      const { id, ...rest } = value;
      return Object.values(rest).join(' ');
    }
    return `${value}`;
  }, [value, maxLength]);
  const borderColor = useMemo(
    () =>
      colorMap?.find(({ pattern }) =>
        new RegExp(pattern).test(transformedValue ?? '')
      )?.color,
    [transformedValue, colorMap]
  );
  return (
    <Box
      {...rest}
      sx={{
        borderColor,
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        gap: 2,
        radius: 'medium',
        backgroundColor: 'accentContext',
        borderRadius: 3,
        cursor: 'default',
      }}
    >
      <Box
        sx={{
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {transformedValue.slice(0, maxLength)}
      </Box>
      {onDelete && (
        <Tooltip content={t('actions.delete')}>
          <Button
            icon={MdClose}
            size="small"
            variant="icon"
            onClick={e => {
              e.stopPropagation();
              onDelete(value);
            }}
          />
        </Tooltip>
      )}
    </Box>
  );
};
