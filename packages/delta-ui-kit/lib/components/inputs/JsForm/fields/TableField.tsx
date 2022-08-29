import { jsx } from '@theme-ui/core';
import { FieldProps, hash, Schema, useDefaults } from 'delta-jsf';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useModal } from '../../../../hooks';
import { Button } from '../../../Button';
import {
  Box,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '../../../containers';
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
import { useArrayFieldHandlers } from '../hooks';
import { JsForm, JsFormManagerOptions, useJsFormManager } from '../JsForm';

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
  const openModal = useModal<Partial<JsModalFormProps>>(
    ({ handleClose, context }) => {
      return (
        <JsModalForm
          handleClose={handleClose}
          initialValue={context?.initialValue}
          schema={items as Schema}
          onChange={context?.onChange}
        />
      );
    },
    { deps: [items] }
  );
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

interface JsModalFormProps extends Omit<ModalProps, 'onChange'> {
  schema: JsFormManagerOptions['schema'];
  initialValue: JsFormManagerOptions['initialValue'];
  onChange?: (data: unknown, prevData?: unknown) => void;
}
const JsModalForm = ({
  schema,
  initialValue,
  onChange,
  handleClose,
  ...rest
}: JsModalFormProps) => {
  const [t] = useTranslation('common');
  const manager = useJsFormManager({
    schema: schema,
    initialValue,
    onSubmit: values => {
      onChange?.(values);
      handleClose?.();
    },
  });
  return (
    <Box
      {...rest}
      sx={{
        overflow: 'auto',
        maxHeight: '90vh',
        '@media screen and (max-height: 800px)': {
          maxHeight: '100vh',
        },
        width: '500px',
        borderRadius: 4,
      }}
    >
      <ModalHeader>
        <Heading level={3}>
          {initialValue ? t('actions.update') : t('actions.addition')}
        </Heading>
      </ModalHeader>
      <ModalBody>
        <JsForm manager={manager} />
      </ModalBody>
      <ModalFooter>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            color="secondary"
            variant="contained-dimmed"
            onClick={handleClose}
          >
            {t('actions.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={async () => await manager.submit()}
          >
            {t('actions.save')}
          </Button>
        </Box>
      </ModalFooter>
    </Box>
  );
};
