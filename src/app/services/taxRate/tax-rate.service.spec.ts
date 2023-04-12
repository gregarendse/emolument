import {TaxRate} from './tax-rate.service';

const salary: number = 66;

describe('TaxRateService', () => {
  let basic: TaxRate;
  let allowance: TaxRate;
  let higher: TaxRate;

  beforeEach(() => {
    allowance = new TaxRate(0, 0, 100);
    basic = new TaxRate(0.5, 100, 150);
    higher = new TaxRate(0.75, 150, null);

  });

  it('First Month', (): void => {
    expect(
      allowance.amount(salary, 0 * salary)
    )
      .withContext("Allowance")
      .toEqual(salary)

    expect(
      basic.amount(salary, 0 * salary)
    )
      .withContext("Basic")
      .toEqual(0)

    expect(
      higher.amount(salary, 0 * salary)
    )
      .withContext("Higher")
      .toEqual(0)
  });

  it('Second Month', (): void => {
    expect(
      allowance.amount(salary, 1 * salary)
    )
      .withContext("Allowance")
      .toEqual(34)

    expect(
      basic.amount(salary, 1 * salary)
    )
      .withContext("Basic")
      .toEqual(32)

    expect(
      higher.amount(salary, 1 * salary)
    )
      .withContext("Higher")
      .toEqual(0)
  });

  it('Third Month', (): void => {
    expect(
      allowance.amount(salary, 2 * salary)
    )
      .withContext("Allowance")
      .toEqual(0)

    expect(
      basic.amount(salary, 2 * salary)
    )
      .withContext("Basic")
      .toEqual(18)

    expect(
      higher.amount(salary, 2 * salary)
    )
      .withContext("Higher")
      .toEqual(48)
  });

  it('Apply Rate', (): void => {
    expect(basic.calculate(50, 100)).toEqual(25)
  });

});
