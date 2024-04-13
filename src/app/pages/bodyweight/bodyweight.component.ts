import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserBodyweightDto } from '../../common/interfaces';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-bodyweight',
  templateUrl: './bodyweight.component.html',
  styleUrl: './bodyweight.component.scss',
})
export class BodyweightComponent implements OnInit {
  bodyweights: IUserBodyweightDto[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];

  constructor(
    private userService: UserService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.userService.getUserBodyweightLog().subscribe({
      next: (data) => {
        this.bodyweights = data.reverse();

        this.chartLabels = this.bodyweights
          .map((value) => {
            return this.getBodyweightDateLabel(value.date);
          })
          .reverse();

        this.chartData = this.bodyweights
          .map((value) => value.bodyweight)
          .reverse();
      },
    });
  }

  logBodyweight() {
    this.bodyweights.unshift({
      date: new Date().toString(),
      bodyweight: 88,
      bodyfat: null,
    });

    const newValues = {
      label: this.getBodyweightDateLabel(new Date().toString()),
      bw: 88,
    };

    this.chartService.setNewBodyweightLog(newValues);
  }

  getLatestBodyFatLog(): number | null {
    const filteredLogs = this.bodyweights.filter((log) => log.bodyfat !== null);

    filteredLogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return filteredLogs.length > 0 ? filteredLogs[0].bodyfat : null;
  }

  private getBodyweightDateLabel(dateValue: string): string {
    const date = new Date(dateValue);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}.${month}`;
  }
}
