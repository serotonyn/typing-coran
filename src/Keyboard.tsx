import React, { Component } from "react";
import { generate } from "shortid";
import Button from "./keyboard/Button";

// const layout = {
//   default: [
//     "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
//     "{tab} ض ص ث ق ف غ ع ه خ ح ج ة \\",
//     "{lock} ش س ي ب ل ا ت ن م ك ؛ {enter}",
//     "{shift} ظ ط ذ د ز ر و ، . / {shift}"
//   ],
//   shift: [
//     "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
//     "{tab} Q W E R T Y U I O P { } |",
//     '{lock} A S D F G H J K L : " {enter}',
//     "{shift} Z X C V B N M < > ? {shift}",
//     ".com @ {space}"
//   ]
// };

const layout: any = {
  default: [
    "1 2 3 4 5 6 7 8 9 0 - =",
    "ض ص ث ق ف غ ع ه خ ح ج ة \\",
    "ش س ي ب ل ا ت ن م ك ؛",
    "ظ ط ذ د ز ر و ، . /",
    "space"
  ],
  shift: [
    "! @ # $ % ^ & * ( ) _",
    "َ ً ِ ٍ ُ ٌ ْ ّ ] [ } { |",
    '« » ى   آ  ٫ ٬ : "',
    "'  ئ ء أ إ ؤ > < ؟"
  ],
  shiftAlt: [
    "ظ ❊ £ € ∞     ° _ ",
    "   ؉ ڤ  ە    چ  ",
    " ے ی پ  ٱ ٹ ں  ک …",
    "  ڈ ڑ ژ   ,  ÷"
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
        condition = false; //to break the while loop
      }
      //prettier-ignore
      const stringOfAllShiftKeys = layout.shift.reduce((acc: string, cur: string) => acc.concat(cur),"");
      if (stringOfAllShiftKeys.includes(keyToPress)) {
        condition = false; //to break the while loop
        wichArrContainsKeyToPress = "shift";
      }
      //prettier-ignore
      const stringOfAllShiftAltKeys = layout.shiftAlt.reduce((acc: string, cur: string) => acc.concat(cur),"");
      if (stringOfAllShiftAltKeys.includes(keyToPress)) {
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
                <Button
                  key={generate()}
                  isToPress={c === keyToPress}
                  char={c}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
