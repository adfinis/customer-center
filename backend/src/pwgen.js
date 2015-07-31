// Original: http://8-p.info/pwgen/pwgen.js
/*
 * pwgen.js
 *
 * Copyright (C) 2003-2006 KATO Kazuyoshi <kzys@8-p.info>
 *
 * This program is a JavaScript port of pwgen.
 * The original C source code written by Theodore Ts'o.
 * <http://sourceforge.net/projects/pwgen/>
 *
 * This file may be distributed under the terms of the GNU General
 * Public License.
 */

const { random, floor } = Math

const INCLUDE_NUMBER = 1
const INCLUDE_CAPITAL_LETTER = 1 << 1

const CONSONANT = 1
const VOWEL     = 1 << 1
const DIPTHONG  = 1 << 2
const NOT_FIRST = 1 << 3

export default class PWGen {
  constructor() {
    this.maxLength            = 8
    this.includeCapitalLetter = true
    this.includeNumber        = true
  }

  /* eslint complexity: [ 1, 20 ] */
  generate0() {
    let result  = ''
    let prev    = 0
    let isFirst = true

    let requested = 0
    if (this.includeCapitalLetter) {
      requested |= INCLUDE_CAPITAL_LETTER
    }

    if (this.includeNumber) {
      requested |= INCLUDE_NUMBER
    }

    let shouldBe = random() < 0.5 ? VOWEL : CONSONANT

    while (result.length < this.maxLength) {
      let i     = floor((this.ELEMENTS.length - 1) * random())
      let str   = this.ELEMENTS[i][0]
      let flags = this.ELEMENTS[i][1]

      /* Filter on the basic type of the next element */
      if ((flags & shouldBe) === 0) {
        continue
      }

      /* Handle the NOT_FIRST flag */
      if (isFirst && flags & NOT_FIRST) {
        continue
      }

      /* Don't allow VOWEL followed a Vowel/Dipthong pair */
      if (prev & VOWEL && flags & VOWEL && flags & DIPTHONG) {
        continue
      }

      /* Don't allow us to overflow the buffer */
      if (result.length + str.length > this.maxLength) {
        continue
      }

      if (requested & INCLUDE_CAPITAL_LETTER) {
        if ((isFirst || flags & CONSONANT) &&
            random() > 0.3) {
          str = str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
          requested &= ~INCLUDE_CAPITAL_LETTER
        }
      }

      /*
       * OK, we found an element which matches our criteria,
       * let's do it!
       */
      result += str

      if (requested & INCLUDE_NUMBER) {
        if (!isFirst && random() < 0.3) {
          result += floor(10 * random()).toString()
          requested &= ~INCLUDE_NUMBER

          isFirst = true
          prev = 0
          shouldBe = random() < 0.5 ? VOWEL : CONSONANT
          continue
        }
      }

      /*
       * OK, figure out what the next element should be
       */
      if (shouldBe === CONSONANT) {
        shouldBe = VOWEL
      }
      else { /* should_be == VOWEL */
        if (prev & VOWEL || flags & DIPTHONG || random() > 0.3) {
          shouldBe = CONSONANT
        }
        else {
          shouldBe = VOWEL
        }
      }

      prev    = flags
      isFirst = false
    }

    if (requested & (INCLUDE_NUMBER | INCLUDE_CAPITAL_LETTER)) {
      return null
    }

    return result
  }

  generate() {
    var result = null

    while (!result) {
      result = this.generate0()
    }

    return result
  }
}

PWGen.prototype.ELEMENTS = [
  [ 'a',  VOWEL ],
  [ 'ae', VOWEL | DIPTHONG ],
  [ 'ah', VOWEL | DIPTHONG ],
  [ 'ai', VOWEL | DIPTHONG ],
  [ 'b',  CONSONANT ],
  [ 'c',  CONSONANT ],
  [ 'ch', CONSONANT | DIPTHONG ],
  [ 'd',  CONSONANT ],
  [ 'e',  VOWEL ],
  [ 'ee', VOWEL | DIPTHONG ],
  [ 'ei', VOWEL | DIPTHONG ],
  [ 'f',  CONSONANT ],
  [ 'g',  CONSONANT ],
  [ 'gh', CONSONANT | DIPTHONG | NOT_FIRST ],
  [ 'h',  CONSONANT ],
  [ 'i',  VOWEL ],
  [ 'ie', VOWEL | DIPTHONG ],
  [ 'j',  CONSONANT ],
  [ 'k',  CONSONANT ],
  [ 'l',  CONSONANT ],
  [ 'm',  CONSONANT ],
  [ 'n',  CONSONANT ],
  [ 'ng', CONSONANT | DIPTHONG | NOT_FIRST ],
  [ 'o',  VOWEL ],
  [ 'oh', VOWEL | DIPTHONG ],
  [ 'oo', VOWEL | DIPTHONG],
  [ 'p',  CONSONANT ],
  [ 'ph', CONSONANT | DIPTHONG ],
  [ 'qu', CONSONANT | DIPTHONG],
  [ 'r',  CONSONANT ],
  [ 's',  CONSONANT ],
  [ 'sh', CONSONANT | DIPTHONG],
  [ 't',  CONSONANT ],
  [ 'th', CONSONANT | DIPTHONG],
  [ 'u',  VOWEL ],
  [ 'v',  CONSONANT ],
  [ 'w',  CONSONANT ],
  [ 'x',  CONSONANT ],
  [ 'y',  CONSONANT ],
  [ 'z',  CONSONANT ]
]
