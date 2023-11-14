import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InteractionInterface {
  id?: string;
  user_id: string;
  interaction_type: string;
  interaction_timestamp?: any;
  interaction_detail?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface InteractionGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  interaction_type?: string;
  interaction_detail?: string;
}
