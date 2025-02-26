export type Menu = {
  id: string;
  title?: string;
  target?: string;
  children?: Menu[];
  visible?: boolean;
};
