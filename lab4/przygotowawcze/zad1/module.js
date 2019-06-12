/**
* Represents Operation
* @constructor
* @param {int} x - x
* @param {int} y - y
*/
module.exports.Operation =  class Operation{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
    /**
 * Function adds this.x and this.y and returns the result.
 */
    sum(){
      return this.x + this.y;
    }
};
