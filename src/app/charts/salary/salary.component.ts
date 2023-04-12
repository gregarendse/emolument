import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {ChartDataset, ChartOptions, ChartType} from "chart.js";
import {months} from "../../constants";

@Component({
  selector: "app-salary",
  templateUrl: "./salary.component.html",
  styleUrls: ["./salary.component.scss"]
})
export class SalaryComponent implements OnChanges {

  @Input() salaries: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: string[] = months;
  public barChartType: ChartType = "bar";
  public barChartLegend: boolean = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] = [];

  private _average: number = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._average = this.average(this.salaries);
    this.barChartData = [
      {
        label: "Salary",
        data: this.salaries,
        type: "bar",
        backgroundColor: "rgb(86, 204, 157)"
      },
      {
        label: "Average",
        data: this.getAveragePoints(),
        type: "line",
        backgroundColor: "rgb(108, 195, 213)"
      },
      {
        label: "Variance",
        data: this.getVariancePoints(),
        type: "bar",
        backgroundColor: "rgb(255, 206, 103)"
      }
    ];

  }

  private getVariancePoints(): number[] {
    let variances: number[] = [];

    for (let salary of this.salaries) {
      variances.push(this._average - salary);
    }

    return variances;
  }

  private getAveragePoints(): number[] {
    let averages: number[] = [];

    for (let i = 0; i < this.salaries.length; i++) {
      averages.push(this._average);
    }

    return averages;
  }

  private average(values: number[]): number {
    return values.reduce((previousValue: number, currentValue: any) => previousValue + currentValue, 0) / values.length;
  }

}
