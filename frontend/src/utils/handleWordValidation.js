export const handleWordValidation = (
  word,
  setShowMessage,
  data,
  puzzle,
  foundWords,
  setFoundWords,
  dispatchGuess
) => {
  const lowerCaseWord = word.content.toLowerCase();

  function validateOuterLetter() {
    let wordToValidate = lowerCaseWord.split("")
    const outLetter = puzzle[puzzle.length - 1].characters + puzzle[puzzle.length - 1].central_letter

    for(let i = 0; i < wordToValidate.length; i++) {
      if(!(outLetter.indexOf(wordToValidate[i]) > -1)) {
        return false;
      }
    }

    return true;
  }

  if (lowerCaseWord.length === 0) {
    setShowMessage("empty");
  } else if (!lowerCaseWord.includes(puzzle[puzzle.length - 1].central_letter)) {
    setShowMessage("missing-central-letter");
  } else if(!validateOuterLetter()) {
    setShowMessage("NON")
  } else if (foundWords.includes(lowerCaseWord)) {
    setShowMessage(true); // Word already found
  } else if (data) {
    const validWord = data.find(answer => answer.word === lowerCaseWord)
    if (validWord) {
      if(!foundWords.includes(validWord)) {
        setFoundWords([...foundWords, lowerCaseWord]);
        dispatchGuess({
          type: "increaseScore",
          score: lowerCaseWord.length === 4 ? 1 : lowerCaseWord.length,
        });
        setShowMessage("showScore");
      } else if (foundWords.includes(validWord)) {
        setShowMessage(true)
      }
    } else {
      setShowMessage("NON"); // Word does not exist
    }
  }
};
