//https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json

import React, { Component } from "react";
import renderCorrectLigature from "./renderCorrectLigatures";
import "./App.css";
import path from "path";
import Keyboard from "./Keyboard";

interface State {
  curSourat: number;
  totalVersesCount: number;
  name: string;
  verses: any;
  curVerseNum: number;
  curVerse: string;
  curWithoutTashkil: string;
  userInput: string;
  curCharNum: number;
  indexOfLigaturedLaOfNegation: number;
}

class App extends Component<{}, State> {
  state: State = {
    curSourat: 2,
    totalVersesCount: 0,
    name: "",
    verses: {},
    curVerseNum: 1,
    curVerse: "",
    curWithoutTashkil: "",
    userInput: "",
    curCharNum: 0,
    indexOfLigaturedLaOfNegation: -1
  };

  handleKeyDown = (e: KeyboardEvent) => {
    const {
      curCharNum,
      curWithoutTashkil,
      curVerseNum,
      totalVersesCount
    } = this.state;
    const isVerseEnd = curCharNum === curWithoutTashkil.length - 1;
    const curChar = curWithoutTashkil[curCharNum];
    const inputCharValue = e.key;
    const isInputEqualCurChar = curChar === inputCharValue;
    const isEndOfSourat = curVerseNum === totalVersesCount;

    if (!isVerseEnd && isInputEqualCurChar) {
      this.setState({ userInput: inputCharValue, curCharNum: curCharNum + 1 });
    } else if (isVerseEnd && !isEndOfSourat) {
      this.setState(
        state => ({ curVerseNum: state.curVerseNum + 1, curCharNum: 0 }),
        () => this.setCurVerse()
      );
    } else if (isEndOfSourat && isVerseEnd) {
      console.log("Congrats you've just finished this sourat");
    }
  };

  componentDidMount() {
    this.getSourat();
    document.addEventListener("keydown", e => this.handleKeyDown(e));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", e => this.handleKeyDown(e));
  }

  getSourat = async () => {
    const { curSourat } = this.state;
    const filePath = path.join("/sourates", `${curSourat}.json`);
    const res = await fetch(filePath);
    const data = await res.json();
    const { count, name, verse } = data;
    this.setState({ totalVersesCount: count, name, verses: verse }, () =>
      this.setCurVerse()
    );
  };

  setCurVerse = () => {
    const { verses, curVerseNum } = this.state;
    const curVerse = verses[`verse_${curVerseNum}`];
    this.setState({ curVerse }, () => this.setCurVerseWithoutTechkil());
  };

  setCurVerseWithoutTechkil = () => {
    const { curVerse } = this.state;
    let stringWithoutTashkil = curVerse.replace(/ِ|ُ|ٓ|ٰ|ْ|ٌ|ٍ|ً|ّ|َ/g, "");

    let indexOfAlef = stringWithoutTashkil.indexOf("لا ");
    if (indexOfAlef > -1) {
      this.setState({ indexOfLigaturedLaOfNegation: indexOfAlef });
    }

    this.setState({ curWithoutTashkil: stringWithoutTashkil });
  };

  updateCurCharNum = () => {
    const { curCharNum, curWithoutTashkil } = this.state;
    const end = curCharNum === curWithoutTashkil.length - 1;
    if (!end) {
      const { curCharNum } = this.state;
      this.setState({ curCharNum: curCharNum + 1 });
    } else {
      this.setState(
        state => ({ curVerseNum: state.curVerseNum + 1, curCharNum: 0 }),
        () => this.setCurVerse()
      );
    }
  };

  getTextWithHighlitedChar = () => {
    const {
      curCharNum,
      curWithoutTashkil,
      indexOfLigaturedLaOfNegation
    } = this.state;
    const curChar = curWithoutTashkil[curCharNum];
    const beforeCurChar = curWithoutTashkil.slice(0, curCharNum);
    const afterCurChar = curWithoutTashkil.slice(curCharNum + 1);
    return renderCorrectLigature(
      beforeCurChar,
      curChar,
      afterCurChar,
      curCharNum,
      curWithoutTashkil,
      indexOfLigaturedLaOfNegation
    );
  };

  textTachkil = () => {
    const { curVerse } = this.state;
    return <div className="duplicate">{curVerse}</div>;
  };

  text = () => {
    return <div className="duplicate">{this.getTextWithHighlitedChar()}</div>;
  };

  render() {
    const { curWithoutTashkil, curCharNum } = this.state;
    if (!curWithoutTashkil) return null;
    let curChar = curWithoutTashkil[curCharNum];
    curChar = curChar === " " ? "space" : curChar;
    return (
      <>
        <div className="App">
          {this.text()}
          {this.textTachkil()}
          <Keyboard keyToPress={curChar} />
          <div>
            <button onClick={this.updateCurCharNum}>next char</button>
            <button
              onClick={() =>
                this.setState(state => ({ curCharNum: state.curCharNum - 1 }))
              }
            >
              prev char
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
