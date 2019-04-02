import { connect } from 'react-redux';
import HeaderComponent from "./HeaderComponent";
import { defaultMapStateToProps } from "../../redux-utils/redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { appInfoActionCreator } from "../../redux-utils/appinfo";


function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators(
    {
      appInfoActionCreator
    },
    dispatch
  );
}

export default connect(defaultMapStateToProps, mapDispatchToProps)(HeaderComponent);
