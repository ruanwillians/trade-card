export type Column = {
  name: string;
  label: string;
  field: string;
  required?: boolean;
  align?: 'center' | 'left' | 'right';
  sortable?: boolean;
};

export type Tabs = {
  name: string;
  label: string;
  icon: string;
};
