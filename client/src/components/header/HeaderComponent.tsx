import React, { Component } from "react";
import { AppInfoActionCreator } from "../../redux-utils/appinfo";
import { AppData } from "../../app_data_reducer";
import { AppState } from "../../app_state_reducer";

interface Props {
  data: AppData;
  state: AppState;
  appInfoActionCreator: AppInfoActionCreator;
}

export default class HeaderComponent extends Component<Props, any> {
  componentWillMount() {
    this.props.appInfoActionCreator();
  }

  render() {
    return (
      <div>
        {this.props.data && this.props.data.appInfo && <h1>{this.props.data.appInfo.name}</h1>}
      </div>
    );
  }
}