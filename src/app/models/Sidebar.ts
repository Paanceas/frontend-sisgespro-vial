import { Submenu } from './Submenu';

export interface Sidebar {
  id: number;
  view: boolean;
  name: string;
  active: boolean;
  icon: string;
  path: string;
  roles: string[];
  submenu: Submenu[];
}
