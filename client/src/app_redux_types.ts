import { AppData } from './app_data_reducer';
import { AppState } from './app_state_reducer';

export interface AppStore {
  data: AppData;
  state: AppState;
}
