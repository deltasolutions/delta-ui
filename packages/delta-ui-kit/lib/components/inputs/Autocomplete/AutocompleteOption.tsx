import { jsx } from '@theme-ui/core';
import { DropMenuItem, DropMenuItemProps } from '../DropMenu';

export interface AutocompleteOptionProps extends DropMenuItemProps {
  title?: string;
}

export const AutocompleteOption = ({
  title,
  ...rest
}: AutocompleteOptionProps) => <DropMenuItem {...rest} />;
