import { Submenu } from "./Submenu";

export interface Sidebar{
  id:number;
  name:string;
  active:boolean
  icon:string;
  path:string;
  roles:string[];
  submenu:Submenu[]
}
