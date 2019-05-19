import React from 'react';

const _ligature_ = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar + '\u200d'}
      <span className='highlight'>{`\u200d${curChar}\u200d`}</span>
      {'\u200d' + afterCurChar}
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
      {beforeCurChar + '\u200d'}
      <span className='highlight'>{`\u200d${curChar}`}</span>
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
      <span className='highlight'>{`${curChar}\u200d`}</span>
      {'\u200d' + afterCurChar}
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
      <span className='highlight'>{curChar}</span>
      {afterCurChar}
    </div>
  );
};

const curCharLam = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar}
      <span className='highlight'>{`${curChar}${afterCurChar[0]}`}</span>
      {afterCurChar.slice(1)}
    </div>
  );
};

const curCharAlef = (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string
) => {
  return (
    <div>
      {beforeCurChar.slice(0, -1)}
      <span className='highlight'>{`${beforeCurChar.slice(
        -1
      )}${curChar}`}</span>
      {afterCurChar}
    </div>
  );
};

export default (
  beforeCurChar: string,
  curChar: string,
  afterCurChar: string,
  curCharNum: number,
  curWithoutTashkil: string,
  indexOfLigaturedLaOfNegation: number
) => {
  /* handle لا */

  const laOfNegation = indexOfLigaturedLaOfNegation > -1;
  if (laOfNegation) {
    if (curCharNum === indexOfLigaturedLaOfNegation) {
      return curCharLam(beforeCurChar, curChar, afterCurChar);
    }
    if (curCharNum === indexOfLigaturedLaOfNegation + 1) {
      return curCharAlef(beforeCurChar, curChar, afterCurChar);
    }
  }

  const isNextCharAnEmptyString = curWithoutTashkil[curCharNum + 2] === ' ';
  const isPrevCharAnEmptyString = curWithoutTashkil[curCharNum - 1] === ' ';
  const isCurCharAnEmptyString = curWithoutTashkil[curCharNum] === ' ';
  const isStartOfSentence = curCharNum === 0;
  const isEndOfSentence = curCharNum === curWithoutTashkil.length - 2;

  const isAlefSucceededByHaa =
    curChar === 'ٱ' && curWithoutTashkil[curCharNum + 1] === 'ه';

  const isHaaPreceededByAlef =
    curChar === 'ه' && curWithoutTashkil[curCharNum - 1] === 'ٱ';

  const isWaaSucceedByLam =
    curChar === 'و' && curWithoutTashkil[curCharNum + 1] === 'ل';

  const isLamPreceededByWaa =
    curChar === 'ل' && curWithoutTashkil[curCharNum - 1] === 'و';

  if (isNextCharAnEmptyString || isEndOfSentence) {
    return ligature_(beforeCurChar, curChar, afterCurChar);
  } else if (isPrevCharAnEmptyString || isStartOfSentence) {
    if (isAlefSucceededByHaa || isWaaSucceedByLam) {
      return ligature(beforeCurChar, curChar, afterCurChar);
    }
    return _ligature(beforeCurChar, curChar, afterCurChar);
  } else if (isCurCharAnEmptyString) {
    return ligature(beforeCurChar, curChar, afterCurChar);
  } else {
    if (isHaaPreceededByAlef || isLamPreceededByWaa) {
      return _ligature(beforeCurChar, curChar, afterCurChar);
    }
    return _ligature_(beforeCurChar, curChar, afterCurChar);
  }
};
