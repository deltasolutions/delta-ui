import { DataOperatorProvider } from './DataOperatorProvider';

export interface DataOperatorOptions<
  Data,
  Context,
  Provider extends DataOperatorProvider<Data, Context>
> {
  context: Context;
  provider: Provider;
}
