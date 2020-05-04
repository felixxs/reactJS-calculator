import Calculation from "../src/logic/calculation";
import Parser from "../src/logic/parser";

describe("Parser and Calculation", function () {
  describe("operations", function () {
    it("single operator - should not be equal to 4359.0908 and should'nt return", function () {
      let parser = new Parser("42342.54-543.7896");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(calculation.calculate()).not.toEqual(4359.0908);
      expect(calculation.calculate()).not.toBe(false);
    });

    it("single operator - should return 10.51", function () {
      let parser = new Parser("4.01+6.50");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([4.01, "+", 6.5]);
      expect(calculation.calculate()).toEqual(10.51);
    });

    it("single operator - should return 149991", function () {
      let parser = new Parser("150000.5-9.5");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([150000.5, "-", 9.5]);
      expect(calculation.calculate()).toEqual(149991);
    });

    it("single operator - should return 3407.25", function () {
      let parser = new Parser("147.5*23.1");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([147.5, "*", 23.1]);
      expect(calculation.calculate()).toEqual(3407.25);
    });

    it("single operator - should return 2157.1", function () {
      let parser = new Parser("4314.2/2");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([4314.2, "/", 2]);
      expect(calculation.calculate()).toEqual(2157.1);
    });

    it("single operator - should return 2157.1", function () {
      let parser = new Parser("3.52^4");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([3.52, "^", 4]);
      expect(calculation.calculate()).toEqual(153.52201216);
    });

    it("multiple operators - should return 12521", function () {
      let parser = new Parser("150000/12-3+6*4");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([150000, "/", 12, "-", 3, "+", 6, "*", 4]);
      expect(calculation.calculate()).toEqual(12521);
    });

    it("multiple operators - should return 2907.25", function () {
      let parser = new Parser("147.5*23.1-500");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([147.5, "*", 23.1, "-", 500]);
      expect(calculation.calculate()).toEqual(2907.25);
    });

    it("multiple operators - should return 2158.1", function () {
      let parser = new Parser("1+4314.2/2");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([1, "+", 4314.2, "/", 2]);
      expect(calculation.calculate()).toEqual(2158.1);
    });

    it("multiple operators - should return 2158.1", function () {
      let parser = new Parser("4.2^2-1+4314.2/2");
      let parsedInput = parser.parseCalculationString();
      let calculation = new Calculation(parsedInput);

      expect(parsedInput).toEqual([4.2, "^", 2, "-", 1, "+", 4314.2, "/", 2]);
      expect(calculation.calculate()).toEqual(2173.74);
    });
  });
});
