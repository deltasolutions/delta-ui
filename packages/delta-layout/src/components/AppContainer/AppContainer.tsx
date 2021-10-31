import { jsx } from '@theme-ui/core';
import i18n from 'i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { I18nextProvider } from 'react-i18next';
import { RestylerContainer, RestylerContainerProps } from './RestylerContainer';

export interface AppContainerProps extends RestylerContainerProps {
  i18n?: any;
}

export const AppContainer = ({
  i18n: passedI18n,
  ...rest
}: AppContainerProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <I18nextProvider i18n={passedI18n ?? i18n}>
        <RestylerContainer {...rest} />
      </I18nextProvider>
    </DndProvider>
  );
};
