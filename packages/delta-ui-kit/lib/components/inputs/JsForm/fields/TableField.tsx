import { jsx } from '@theme-ui/core';
import { FieldProps, hash, Schema, useDefaults } from 'delta-jsf';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { Button } from '../../../Button';
import { Box } from '../../../containers';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from '../../../displays';
import { Tooltip } from '../../../Tooltip';
import { useArrayFieldHandlers, useJsFormModal } from '../hooks';

export const TableField = (props: FieldProps) => {
  useDefaults(props);
  const [t] = useTranslation('common');
  const {
    schema: { items },
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  const { handleChange, handleAdd, handleDelete, values } =
    useArrayFieldHandlers(props);
  const openModal = useJsFormModal({ schema: items });
  const columns = useMemo(
    () =>
      Object.entries((items as Schema)?.properties ?? {})
        .map<any>(([key, value]) => ({
          header: (value as Schema)?.title ?? key,
          key,
        }))
        .concat([
          {
            header: () => (
              <Tooltip
                content={
                  <span sx={{ textTransform: 'none' }}>{t('actions.add')}</span>
                }
                delay={100}
              >
                <Button
                  icon={MdAddCircleOutline}
                  size="small"
                  sx={{ ml: 'auto' }}
                  variant="icon"
                  onClick={() => openModal({ onChange: handleAdd })}
                />
              </Tooltip>
            ),
            minWidth: 150,
            key: '_action',
            cell: datum => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    ml: 'auto',
                    alignItems: 'center',
                  }}
                >
                  {handleDelete && (
                    <Tooltip content={t('actions.delete')} delay={100}>
                      <Button
                        icon={AiOutlineDelete}
                        size="small"
                        variant="icon"
                        onClick={() => {
                          handleDelete(datum);
                        }}
                      />
                    </Tooltip>
                  )}
                  {
                    <Tooltip content={t('actions.edit')} delay={100}>
                      <Button
                        icon={TbEdit}
                        size="small"
                        variant="icon"
                        onClick={() => {
                          openModal({
                            initialValue: datum,
                            onChange: v => handleChange(v, datum),
                          });
                        }}
                      />
                    </Tooltip>
                  }
                </Box>
              );
            },
          },
        ]),
    [items, values]
  );
  return (
    <PrimitiveTemplate {...props}>
      <Table>
        <TableHeader stickyOffset={0}>
          <TableHeaderRow>
            {columns.map(c => (
              <TableHeaderCell key={c.key}>
                {typeof c.header === 'function' ? (
                  c.header()
                ) : (
                  <span> {c.header}</span>
                )}
              </TableHeaderCell>
            ))}
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {values.map(datum => (
            <TableBodyRow key={hash(datum)}>
              {columns.map(c => (
                <TableBodyCell key={hash(c)}>
                  {c.cell ? c.cell(datum) : datum[c.key]}
                </TableBodyCell>
              ))}
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </PrimitiveTemplate>
  );
};
