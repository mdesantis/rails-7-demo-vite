// This regexp is meant to be equal to the one implemented by Rails' ActiveSupport library used in order to match blank
// strings. References:
// - https://api.rubyonrails.org/classes/String.html#method-i-blank-3F
// - https://github.com/ruby/ruby/blob/v2_7_3/enc/unicode/12.1.0/name2ctype.h#L2997-L3010
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// - https://unicode.org/reports/tr18/#General_Category_Property
// export const BLANK_RE = /^\p{White_Space}*$/mu

const BLANK_RE = /^\p{White_Space}*$/mu

export default function isBlank(string) {
  return !string || BLANK_RE.test(string)
}
