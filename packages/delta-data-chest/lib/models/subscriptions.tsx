export interface DataSubscription<Data> extends AsyncIterable<Data> {
  cancel: () => void;
}
