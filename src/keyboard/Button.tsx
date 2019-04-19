import React, { Component } from "react";

interface Props {
  char: string;
  isToPress: boolean;
}

export default class Button extends Component<Props, {}> {
  render() {
    const { char, isToPress } = this.props;
    const classs = isToPress ? "button pressed" : "button";
    return <div className={classs}>{char}</div>;
  }
}
