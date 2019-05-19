//https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json

import React, { Component } from 'react';
import renderCorrectLigature from './renderCorrectLigatures';
import './App.css';
// import path from "path";
import Keyboard from './Keyboard';

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
    curSourat: 1,
    totalVersesCount: 0,
    name: '',
    verses: {},
    curVerseNum: 2,
    curVerse: '',
    curWithoutTashkil: '',
    userInput: '',
    curCharNum: 0,
    indexOfLigaturedLaOfNegation: -1
  };

  handleKeyDown = (e: KeyboardEvent) => {
    const { curCharNum, curVerseNum, totalVersesCount, curVerse } = this.state;
    const isVerseEnd = curCharNum === curVerse.length - 2;
    const curChar = curVerse[curCharNum];
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
    document.addEventListener('keydown', e => this.handleKeyDown(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', e => this.handleKeyDown(e));
  }

  getSourat = async () => {
    // const { curSourat } = this.state;
    // const filePath = path.join("/sourates", `${curSourat}.json`);
    const res = await fetch(
      'https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_1.json'
    );
    const data = await res.json();
    const { count, name, verse } = data;
    this.setState({ totalVersesCount: count, name, verses: verse }, () =>
      this.setCurVerse()
    );
  };

  setCurVerse = () => {
    const { verses, curVerseNum } = this.state;
    const curVerse = verses[`verse_${curVerseNum}`];
    this.setState({ curVerse });
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
    const { curCharNum, curVerse, indexOfLigaturedLaOfNegation } = this.state;
    const curChar = curVerse[curCharNum];
    const beforeCurChar = curVerse.slice(0, curCharNum);
    const afterCurChar = curVerse.slice(curCharNum + 1);
    const arr = [1619, 1616, 1618, 1617, 1614, 1648, 1615];
    const nextChar = curVerse[curCharNum + 1];
    const nextNextChar = curVerse[curCharNum + 2];
    console.log(curChar, curChar.charCodeAt(0));
    if (arr.includes(curChar.charCodeAt(0))) {
      this.setState({ curCharNum: curCharNum + 1 });
    } else {
      // if next char is also a tashkil /> omit it
      if (arr.includes(nextChar.charCodeAt(0))) {
        if (!nextNextChar) {
          return renderCorrectLigature(
            beforeCurChar,
            curChar,
            afterCurChar.slice(2),
            curCharNum,
            curVerse,
            indexOfLigaturedLaOfNegation
          );
        }
        if (arr.includes(nextNextChar.charCodeAt(0))) {
          return renderCorrectLigature(
            beforeCurChar,
            curChar,
            afterCurChar.slice(2),
            curCharNum,
            curVerse,
            indexOfLigaturedLaOfNegation
          );
        }
        return renderCorrectLigature(
          beforeCurChar,
          curChar,
          afterCurChar.slice(1),
          curCharNum,
          curVerse,
          indexOfLigaturedLaOfNegation
        );
      }
      return renderCorrectLigature(
        beforeCurChar,
        curChar,
        afterCurChar,
        curCharNum,
        curVerse,
        indexOfLigaturedLaOfNegation
      );
    }
  };

  textTachkil = () => {
    const { curVerse } = this.state;
    const codes = curVerse
      .split('')
      .map(c => c.charCodeAt(0))
      .join(',');
    console.log(codes);
    // return <div className='duplicate'>{codes}</div>;
    return <div className='duplicate'>{curVerse}</div>;
  };

  text = () => {
    return <div className='duplicate'>{this.getTextWithHighlitedChar()}</div>;
  };

  render() {
    const { curVerse, curCharNum } = this.state;
    if (!curVerse) return null;
    let curChar = curVerse[curCharNum];
    curChar = curChar === ' ' ? 'space' : curChar;
    return (
      <>
        <div className='App'>
          {this.text()}
          {/* {this.textTachkil()} */}
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
