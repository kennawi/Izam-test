// export type MenuPartition = {
//   id: string;
//   title?: string;
//   target?: string;
//   visible?: boolean;
// };

export type Menu = {
  id: string;
  title?: string;
  target?: string;
  children?: Menu[];
  visible?: boolean;
};
