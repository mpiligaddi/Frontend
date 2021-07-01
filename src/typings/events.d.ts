export type ChangeEvent<T = unknown> = React.ChangeEvent<{
  name?: string;
  value: T;
}>;
