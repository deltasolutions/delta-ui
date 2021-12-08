import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { BiColumns } from 'react-icons/bi';
import { HiViewGridAdd } from 'react-icons/hi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Button, useModal, useThemed } from 'restyler';
import { ColumnsModal } from './ColumnsModal';
import { FeedContext } from './FeedContext';
import { RegistryModal } from './RegistryModal';

export interface FeedSectionExtrasProps {
  id: string;
}

export const FeedSectionExtras = ({ id }: FeedSectionExtrasProps) => {
  const ThemedFeedSectionExtras = useThemed('div', 'feed.section.extras');
  const {
    manager,
    manager: { registry, removeSection }
  } = useContext(FeedContext);
  const { openModal } = useModal();
  const openColumnsModal = useCallback(() => {
    openModal({
      kind: 'small',
      render: props => (
        <ColumnsModal manager={manager} sectionId={id} {...props} />
      )
    });
  }, [id, manager, openModal]);
  const openItemsModal = useCallback(() => {
    openModal({
      kind: 'small',
      render: props => (
        <RegistryModal
          sectionId={id}
          manager={manager}
          registry={registry}
          {...props}
        />
      )
    });
  }, [id, manager, registry, openModal]);
  return (
    <ThemedFeedSectionExtras>
      <Button kind="icon" onClick={() => openItemsModal()}>
        <HiViewGridAdd />
      </Button>
      <Button kind="icon" onClick={() => openColumnsModal()}>
        <BiColumns />
      </Button>
      <Button kind="icon" onClick={() => removeSection(id)}>
        <RiDeleteBin2Fill />
      </Button>
    </ThemedFeedSectionExtras>
  );
};
