import React, { Component } from "react";

interface Props {
  char: string;
  isToPress: boolean;
}

export default class Button extends Component<Props, {}> {
  renderSpecialButton = (button: string) => {
    switch (button) {
      case "tab":
        return <div className="button special_button tab">Tab</div>;
      case "delete":
        return <div className="button special_button tab">delete</div>;
      case "caplock":
        return <div className="button special_button caplock">caplock</div>;
      case "restart":
        return <div className="button special_button restart">restart</div>;
      case "shift":
        return <div className="button special_button shift">shift</div>;
      case "space":
        return <div className="button special_button space">space</div>;
      case "alt":
        return <div className="button special_button alt">alt</div>;
    }
    return "s";
  };

  render() {
    const { char, isToPress } = this.props;
    const classs = isToPress ? "button pressed" : "button";
    // test if its a special button eg. tab or space
    if (char.match(/{.+}/g)) {
      const name = char.slice(1, -1);
      // console.log(name);
      return this.renderSpecialButton(name);
    }
    return <div className={classs}>{char}</div>;
  }
}
