import { StringCalculator } from "..";

describe('String Calculator', function () {
    let calc = null;
  
    beforeEach(function() {
      calc = new StringCalculator();
    });
  
    test('handles empty addition', function () {
      expect(calc.add('')).toBe(0);
    });
  
    test('handles unary addition', function () {
      expect(calc.add('225')).toBe(225);
      expect(calc.add('5')).toBe(5);
    });
  
    test('handles binary addition', function () {
      expect(calc.add('150,25')).toBe(175);
      expect(calc.add('1,2')).toBe(3);
    });
  
    test('handles addition of infinite number of operands', function () {
      expect(calc.add('133,36,1,3,5')).toBe(178);
      expect(calc.add('1,2,90,100')).toBe(193);
    });
  
    test('supports number strings delimited with newlines', function () {
      expect(calc.add('133\n36,1,3,5')).toBe(178);
      expect(calc.add('1\n2\n90\n100')).toBe(193);
    });
  
    test('dynamically changes the delimiter', function () {
      expect(calc.add('//;\n' + '133\n36,1,3;5')).toBe(178);
      expect(calc.add('//!\n' + '1!2!90!100!')).toBe(193);
    });
  
    test('does not like negative numbers', function () {
      expect(function() {
        calc.add('-41,50');
      }).toThrow('negatives not allowed -41');
  
      expect(function() {
        calc.add('-41,50,-20,-30');
      }).toThrow('negatives not allowed -41 -20 -30');
    });
  
    test('ignores numbers bigger than 1000', function () {
      expect(calc.add('133,36,1,3,5000')).toBe(173);
      expect(calc.add('1,2,90,100,1000,10000,100000')).toBe(1193);
    });
  
    test('handles delimiters of any length', function () {
      expect(calc.add('//[***]\n1***2***3')).toBe(6);
      expect(calc.add('//[,!,]\n1,!,2,!,90,!,100,!,1000,!,10000,!,100000')).toBe(1193);
    });
  
    test('handles multiple custom delimiters', function () {
      expect(calc.add('//[*][%]\n1*2%3')).toBe(6);
      expect(calc.add('//[!!][^^]\n1!!2!!90!!100^^1000!!10000!!100000')).toBe(1193);
    });
  });


