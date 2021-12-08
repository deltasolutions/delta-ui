import { jsx } from '@theme-ui/core';
import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemed } from 'restyler';
import {
  Box,
  Button,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps
} from 'restyler';
import { useDebounce } from '../../hooks';
import { ComponentDef, FeedManager } from '../../models';

export interface RegistryModalProps extends ModalRendererProps {
  manager: FeedManager;
  sectionId: string;
  registry: ComponentDef[];
}

export const RegistryModal = ({
  manager: { addItemToSection },
  sectionId,
  registry,
  handleClose
}: RegistryModalProps) => {
  const [t] = useTranslation();
  const ThemedRegistryQuery = useThemed('div', 'feed.registry.query');
  const ThemedRegistryContent = useThemed('div', 'feed.registry.content');
  const ThemedRegistryItem = useThemed('div', 'feed.registry.item');
  const ThemedRegistryItemTitle = useThemed('div', 'feed.registry.item.title');
  const ThemedRegistryItemDescription = useThemed(
    'div',
    'feed.registry.item.description'
  );
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const filtered = useMemo(
    () =>
      registry.filter(
        v =>
          !debouncedQuery ||
          (v.title + (v.description ?? ''))
            .toLocaleLowerCase()
            .includes(debouncedQuery.toLocaleLowerCase())
      ),
    [registry, debouncedQuery]
  );
  const content = useMemo(
    () => (
      <ThemedRegistryContent>
        {filtered.map(({ id, title, description }) => (
          <ThemedRegistryItem
            key={id}
            onClick={() => {
              addItemToSection(id, sectionId);
              handleClose();
            }}
          >
            <ThemedRegistryItemTitle>{title}</ThemedRegistryItemTitle>
            {description && (
              <ThemedRegistryItemDescription>
                {description}
              </ThemedRegistryItemDescription>
            )}
          </ThemedRegistryItem>
        ))}
      </ThemedRegistryContent>
    ),
    [filtered, addItemToSection]
  );
  return (
    <Fragment>
      <ModalHeader>
        <Heading kind="modal">{t('common:sections.feedItemRegistry')}</Heading>
      </ModalHeader>
      <ModalBody>
        <ThemedRegistryQuery>
          <Input
            placeholder={t('common:labels.search')}
            value={query}
            onChange={(v: string) => setQuery(v)}
          />
        </ThemedRegistryQuery>
        {content}
      </ModalBody>
      <ModalFooter>
        <Button kind="primary" onClick={handleClose}>
          {t('common:actions.cancel')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};
