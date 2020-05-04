export default class Parser {
  constructor(expression) {
    this.expression = expression;
  }

  parseCalculationString() {
    // --- Parse a calculation string into an array of numbers and operators
    const regex = /(?:(?:^|[-+*/^])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;
    if (regex.test(this.expression)) {
      var calculationString = [],
        current = "";
      for (var i = 0, character; (character = this.expression.charAt(i)); i++) {
        if ("^*/+-".indexOf(character) > -1) {
          if (current == "" && character == "-") {
            current = "-";
          } else {
            calculationString.push(parseFloat(current), character);
            current = "";
          }
        } else {
          current += this.expression.charAt(i);
        }
      }
      if (current != "") {
        calculationString.push(parseFloat(current));
      }
      return calculationString;
    } else {
      return false;
    }
  }

  parseResultString(calculationstring, result) {
    let resultString = "";

    calculationstring.map((element) => {
      resultString += element + " ";
    });

    resultString += "= " + result;
    return resultString;
  }

  mathematicalExpressionFromResultstring(string) {
    return string.slice(0, string.indexOf("=") - 1);
  }
}
