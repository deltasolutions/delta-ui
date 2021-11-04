export interface Subscription<Data> extends AsyncIterable<Data> {
  cancel: () => void;
}
