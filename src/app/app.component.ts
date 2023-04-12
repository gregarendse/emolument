import {Component} from "@angular/core";
import {months} from "./constants";
import {SalaryService} from "./services/salary/salary.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public readonly title: string = "emolument";

  constructor(
    private readonly salary: SalaryService
  ) {
  }

  get months(): string[] {
    return months;
  }

  private _salaries: number[] = [];

  get salaries(): number[] {
    return this._salaries;
  }

  get average(): number {
    return this._salaries.reduce((previousValue: number, currentValue: any) => previousValue + currentValue, 0) / this._salaries.length;
  }

  public onKeyup(value: string): void {
    this._salaries = this.salary.calculate(+value);

  }

}
