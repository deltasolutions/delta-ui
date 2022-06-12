import { jsx } from '@theme-ui/core';
import { Anchor } from '../../../Anchor';
import { Breadcrumbs } from '../../../navs';
import { Heading } from '../../Heading';
import { LayoutMainHeader } from '../LayoutMainHeader';

export const Header = () => {
  return (
    <LayoutMainHeader>
      <Bread />
    </LayoutMainHeader>
  );
};
const items = ['Control', 'Devices'];

const Bread = () => {
  return (
    <Heading level={3}>
      <Breadcrumbs>
        {items.map((i, index, arr) => (
          <Anchor
            key={i + index}
            href="#"
            sx={{
              color: index === arr.length - 1 ? 'accentOnSurface' : 'onSurface',
            }}
            variant="pure"
          >
            {i}
          </Anchor>
        ))}
      </Breadcrumbs>
    </Heading>
  );
};
