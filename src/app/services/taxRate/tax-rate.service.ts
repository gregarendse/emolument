export class TaxRate {

  private readonly _rate: number;
  private readonly _min: number;
  private readonly _max: number;
  private readonly _size: number;

  constructor(
    rate: number,
    min: number,
    max: number | null
  ) {
    if (max) {
      this._max = max;  // 100
      this._size = max - min
    } else {
      this._max = 999999999;
      this._size = this._max;
    }
    this._min = min;  // 0
    this._rate = rate;
  }

  // 66, 66
  public amount(salary: number, total: number): number {
    if (this._max && this._max < total) {
      // Total already more than tax bracket.
      return 0;
    }

    if (this._min && this._min > total + salary) {
      // Salary fall outside of tax bracket
      return 0;
    }
    //  A:  132 = 66 + 66 - 0
    //  B:  32  = 66 + 66 - 100
    let amount: number = total + salary - this._min  //  normalize
    //  A:  66  = 66 - 0
    //  B:  0   = 66 - 100
    let used: number = Math.max(total - this._min, 0);

    //  A:  True
    //  B:  False
    if (amount > this._size) {
      //  A:  34 = 100 - 66
      return this._size - used;
    }

    //  B:  False
    if (amount < 0) {
      return 0;
    }

    //  B:  32  = 32 - 0
    return amount - used;

    // this._size
    // total - this._min // usage
    //
    // // How much of the bracket has been used                             A    B
    // let used: number = Math.max(total - this._min, 0);        //  66    0
    // let remaining: number = Math.max(this._size - used, 0);   //  34    50
    // let usage: number = Math.min(salary, remaining);                //  34   32?
    //
    // return usage;

    //  66    salary
    //  66    total
    //   0    min
    // 100    max
    //--------------
    //  34
    // min(max - total + salary, max) - min
  }

  public calculate(salary: number, total: number): number {
    return this.amount(salary, total) * (1 - this._rate);

  }
}
