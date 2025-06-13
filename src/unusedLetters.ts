/**
 * Problem 1: Unused letters
 * 
 * Given a string of English letters, write a function that returns all the letters of the alphabet that are
 * unused. For example the string "A slow yellow fox crawls under the proactive dog" would return
 * "bjkmqz" since none of those letters are used. The string "A quick brown fox jumps over the lazy dog"
 * would return "" since all of the English letters are in that sentence.
 * 
 * @param str the string to check if it contains letter in the alphabet
 * @returns a string containing unused letters
 */
export function unusedLetters(str: string): string {
  // I like this because I can easily swap the English alphabet with literally
  // any other alphabet and the logic still works. The ascii code solution would break.
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let result = ''

  // time complexity O(n * 26) since we loop through the letters once
  for (const letter of alphabet) {
    if (str.indexOf(letter.toLowerCase()) === -1) {
      result += letter;
    }
  }

  return result
}

// This alternative does all the "looping" up front and makes the
// checking logic simple. Basically the same as above
export function unusedLettersAlt1(str: string): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const usedLetters = new Set(str.toLowerCase());

  let result = '';
  for (const letter of alphabet) {
    if (!usedLetters.has(letter)) {
      result += letter;
    }
  }
  return result;
}

/**
 * NOTES:
 * 
 * I could do some bitmapping stuff, but I would never do that in prod.
 * I would hate to have to read that code later myself too and there's no real benefit
 * in terms of performance.
 */
