import {Injectable} from "@angular/core";
import {TaxRate} from "../taxRate/tax-rate.service";

@Injectable({
  providedIn: "root"
})
export class SalaryService {

  private readonly brackets: TaxRate[] = [
    new TaxRate(0, 0, 12570), // Allowance
    new TaxRate(0.2, 12570, 37700),  // Basic
    new TaxRate(0.4, 37700, 125140),  // Higher
    new TaxRate(0.45, 125140, null)  // Additional
  ];

  constructor() {
  }

  public calculate(salary: number): any[] {

    let months: number[] = [];
    let total: number = 0;

    for (let i: number = 0; i < 12; i++) {

      months.push(
        this.brackets
          .map((value: TaxRate, index: number) => value.calculate(salary, total))
          .reduce((previousValue: number, currentValue: number) => currentValue + previousValue)
      );

      total += salary;

    }

    return months;
  }
}
