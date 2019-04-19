import React, { Component } from "react";
import { generate } from "shortid";
import Button from "./keyboard/Button";

const layout: any = {
  default: [
    "ـ 1 2 3 4 5 6 7 8 9 0 - = {delete}",
    "{tab} ض ص ث ق ف غ ع ه خ ح ج ة \\",
    "{caplock} ش س ي ب ل ا ت ن م ك ؛ {restart}",
    "{shift} ظ ط ذ د ز ر و ، . / {shift}",
    "{space}"
  ],
  shift: [
    " ! @ # $ % ^ & * ( ) _ + {delete}",
    "{tab} َ ً ِ ٍ ُ ٌ ْ ّ ] [ } { |",
    '{caplock} « » ى   آ  ٫ ٬ : " {restart}',
    "{shift} '  ئ ء أ إ ؤ > < ؟ {shift}"
  ],
  shiftAlt: [
    " ظ ❊ £ € ∞     ° _  {delete}",
    "{tab}    ؉ ڤ  ە    چ  ",
    "{caplock}  ے ی پ  ٱ ٹ ں  ک … {restart}",
    "{shift}   ڈ ڑ ژ   ,  ÷ {shift}",
    "{alt} {space} {alt}"
  ]
};

interface Props {
  keyToPress: string;
}

export default class KeyboardLayout extends Component<Props, {}> {
  state = {
    input: ""
  };
  onInputChanged = (data: any) => {
    this.setState({ input: data });
  };
  onInputSubmitted = (data: any) => {
    console.log("Input submitted:", data);
  };

  showCorrectLayout = (keyToPress: string) => {
    //TODO blog it
    let condition = true;
    let wichArrContainsKeyToPress = "default";
    while (condition) {
      //prettier-ignore
      const stringOfAllDefaultKeys = layout.default.reduce((acc: string, cur: string) => acc.concat(cur),"");
      if (stringOfAllDefaultKeys.includes(keyToPress)) {
        console.log("1");
        condition = false; //to break the while loop
      }
      //prettier-ignore
      const stringOfAllShiftKeys = layout.shift.reduce((acc: string, cur: string) => acc.concat(cur),"");
      if (stringOfAllShiftKeys.includes(keyToPress)) {
        condition = false; //to break the while loop
        console.log("2");
        wichArrContainsKeyToPress = "shift";
      }
      //prettier-ignore
      const stringOfAllShiftAltKeys = layout.shiftAlt.reduce((acc: string, cur: string) => acc.concat(cur),"");
      if (stringOfAllShiftAltKeys.includes(keyToPress)) {
        console.log("3");
        condition = false; //to break the while loop
        wichArrContainsKeyToPress = "shiftAlt";
      }

      condition = false;
    }
    return wichArrContainsKeyToPress;
  };

  render() {
    const { keyToPress } = this.props;
    const wichArrContainsKeyToPress = this.showCorrectLayout(keyToPress);

    return (
      <div className="keyboard">
        {layout[wichArrContainsKeyToPress].map((line: any) => {
          return (
            <div className="line" key={generate()}>
              {line.split(" ").map((c: any) => (
                <>
                  {console.log(keyToPress)}
                  <Button
                    key={generate()}
                    isToPress={c === keyToPress}
                    char={c}
                  />
                </>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
