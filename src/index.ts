/**
 * Scope augmentation Of String class/constructor
 */
declare global {
    interface String {
        escapeRegExp(): string;
    }
}


/*
 * The String calculator function.
 */
export const StringCalculator = function ():void {
    this.defaultDelimiters = '\n|,';
  };
  
  /*
   * Useful when dynamically generating regular expressions.
   */
  String.prototype.escapeRegExp = function ():string {
    return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  };
  
  StringCalculator.prototype._parseDelimiters = function (custom) {
    let delimiters = '|' + custom;
  
    // Override default value if we are in a multiple-delimiter case.
    if (custom.indexOf('[') === 0) {
      custom = custom.split('[').slice(1);
      // Retrieve all delimiters and add them to the regex.
      delimiters = custom.reduce(function (acc, d) {
        return acc += '|' + d.substring(0, d.length - 1).escapeRegExp();
      }, '');
    }
  
    return delimiters;
  };
  
  /*
   * Parses the string to return an array of operands.
   */
  StringCalculator.prototype._parseNumbers = function (str:string):string[] {
    let delimiters:string = this.defaultDelimiters;
  
    // If there are custom delimiters, process them.
    if (str.indexOf('//') === 0) {
      delimiters += this._parseDelimiters(str.substring(2, str.indexOf('\n')));
      str = str.substring(str.indexOf('\n'));
    }
  
    return str.split(new RegExp('(' + delimiters + ')'));
  };
  
  /*
   * The add method, takes a string of numbers.
   */
  StringCalculator.prototype.add = function (numbers:string):string | number {
    // Separate numbers using the delimiters.
    let operands:string[] = this._parseNumbers(numbers);
    let negatives:string = '';
  
    // Calculates the sum of all the numbers.
    let sum:string | number = operands.reduce(function (acc:string, num:string):string | number {
      let tempnum = Number(num);
      let tempacc = Number(acc);
      if (tempnum < 0) {
        negatives += ' ' + tempnum;
      }
  
      return tempacc + (tempnum <= 1000 ? tempnum : 0);
    }, 0);
  
    // Negative numbers are reported.
    if (negatives.length > 0) {
      throw 'negatives not allowed' + negatives;
    }
  
    return sum;
  };

  const stringCalculator = new StringCalculator();

//   console.log(stringCalculator.add(""));
//   console.log(stringCalculator.add('225'));
//   console.log(stringCalculator.add('1,2'));
//   console.log(stringCalculator.add('1,2,90,100'));
//   console.log(stringCalculator.add('1\n2\n90\n100'));
//   console.log(stringCalculator.add('//!\n' + '1!2!90!100!'));
// //   console.log(stringCalculator.add('-41,50,-20,-30'));
//   console.log(stringCalculator.add('1,2,90,100,1000,10000,100000'));
//   console.log(stringCalculator.add('//[***]\n1***2***3'));
//   console.log(stringCalculator.add('//[*][%]\n1*2%3'));


