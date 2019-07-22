import React, { Component } from "react";
import { AppData } from "../../app_data_reducer";
import { AppState } from "../../app_state_reducer";
import { GetAppInfo } from "./HeaderContainer";

interface Props {
  data: AppData;
  state: AppState;
  getAppInfo: GetAppInfo;
}

const divStyle = {
  height: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 25,
  paddingRight: 25,
  borderBottom: 'solid 0.2px #E6E8EB',
};

const logoStyle = {
  fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif',
  color: '#292929"',
  fontSize: '24px'
};

export default class HeaderComponent extends Component<Props, any> {
  componentWillMount() {
    this.props.getAppInfo();
  }

  render() {
    return (
      <div style={divStyle}>
        {this.props.data && this.props.data.appInfo &&
          <p style={logoStyle}>{this.props.data.appInfo.name}</p>}
        <div>
          <p>Account</p>
        </div>
      </div>
    );
  }
}