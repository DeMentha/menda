import { connect } from 'react-redux';
import HeaderComponent from "./HeaderComponent";
import { defaultMapStateToProps } from "../../redux-utils/redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { defaultActionCreator } from "../../redux-utils/redux";
import { AppInfoActionType } from '../../app_data_reducer';

export type GetAppInfo = () => void;

export const getAppInfo: GetAppInfo = () => {
  return defaultActionCreator(AppInfoActionType.APP_INFO, null);
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators(
    {
      getAppInfo
    },
    dispatch
  );
}

export default connect(defaultMapStateToProps, mapDispatchToProps)(HeaderComponent);
