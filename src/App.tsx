//https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json

import React, { Component } from "react";
import renderCorrectLigature from "./renderCorrectLigatures";
import "./App.css";
import path from "path";
import Keyboard from "./Keyboard";

interface State {
  totalVersesCount: number;
  name: string;
  verses: any;
  curVerseNum: number;
  curVerse: string;
  curWithoutTashkil: string;
  userInput: string;
  curCharNum: number;
}

class App extends Component<{}, State> {
  state: State = {
    totalVersesCount: 0,
    name: "",
    verses: {},
    curVerseNum: 1,
    curVerse: "",
    curWithoutTashkil: "",
    userInput: "",
    curCharNum: 0
  };

  handleKeyDown = (e: KeyboardEvent) => {
    const { curCharNum, curWithoutTashkil } = this.state;
    const end = curCharNum === curWithoutTashkil.length - 1;
    const curChar = curWithoutTashkil[curCharNum];
    const inputCharValue = e.key;
    const isInputEqualCurChar = curChar === inputCharValue;

    if (!end && isInputEqualCurChar) {
      this.setState({ userInput: inputCharValue, curCharNum: curCharNum + 1 });
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
    const curSourat = 1;
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
    const stringWithoutTashkil = curVerse.replace(/ِ|ُ|ٓ|ٰ|ْ|ٌ|ٍ|ً|ّ|َ/g, "");

    this.setState({ curWithoutTashkil: stringWithoutTashkil });
  };

  updateCurCharNum = () => {
    const { curCharNum } = this.state;
    this.setState({ curCharNum: curCharNum + 1 });
  };

  getTextWithHighlitedChar = () => {
    const { curCharNum, curWithoutTashkil } = this.state;
    const curChar = curWithoutTashkil[curCharNum];
    const beforeCurChar = curWithoutTashkil.slice(0, curCharNum);
    const afterCurChar = curWithoutTashkil.slice(curCharNum + 1);
    return renderCorrectLigature(
      beforeCurChar,
      curChar,
      afterCurChar,
      curCharNum,
      curWithoutTashkil
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
