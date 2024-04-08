import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserBodyweightDto } from '../../common/interfaces';

@Component({
  selector: 'app-bodyweight',
  templateUrl: './bodyweight.component.html',
  styleUrl: './bodyweight.component.scss',
})
export class BodyweightComponent implements OnInit {
  bodyweights: IUserBodyweightDto[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserBodyweightLog().subscribe({
      next: (data) => {
        this.bodyweights = data.reverse();

        this.chartLabels = this.bodyweights
          .map((value) => {
            const date = new Date(value.date);
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return `${day}.${month}`;
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
  }

  getLatestBodyfatLog(): number | null {
    const filteredLogs = this.bodyweights.filter((log) => log.bodyfat !== null);

    filteredLogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return filteredLogs.length > 0 ? filteredLogs[0].bodyfat : null;
  }
}
