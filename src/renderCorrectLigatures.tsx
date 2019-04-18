import React from "react";

const _ligature_ = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar + "\u200d"}
      <span className="highlight">{`\u200d${curChar}\u200d`}</span>
      {"\u200d" + afterCurChar}
    </div>
  );
};

const ligature_ = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar + "\u200d"}
      <span className="highlight">{`\u200d${curChar}`}</span>
      {afterCurChar}
    </div>
  );
};

const _ligature = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar}
      <span className="highlight">{`${curChar}\u200d`}</span>
      {"\u200d" + afterCurChar}
    </div>
  );
};

const ligature = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar}
      <span className="highlight">{curChar}</span>
      {afterCurChar}
    </div>
  );
};

export default (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string,
  curCharNum: number,
  curWithoutTashkil: string
) => {
  const isNextCharAnEmptyString = curWithoutTashkil[curCharNum + 1] === " ";
  const isPrevCharAnEmptyString = curWithoutTashkil[curCharNum - 1] === " ";
  const isCurCharAnEmptyString = curWithoutTashkil[curCharNum] === " ";
  const isStartOfSentence = curCharNum === 0;
  const isEndOfSentence = curCharNum === curWithoutTashkil.length - 1;

  if (isNextCharAnEmptyString || isEndOfSentence) {
    return ligature_(beforeCurChar, curChar, afterCurChar);
  } else if (isPrevCharAnEmptyString || isStartOfSentence) {
    return _ligature(beforeCurChar, curChar, afterCurChar);
  } else if (isCurCharAnEmptyString) {
    return ligature(beforeCurChar, curChar, afterCurChar);
  } else {
    return _ligature_(beforeCurChar, curChar, afterCurChar);
  }
};
