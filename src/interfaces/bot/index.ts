import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BotInterface {
  id?: string;
  name: string;
  description?: string;
  created_by: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface BotGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  created_by?: string;
}
