import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserBodyweightDto } from '../../common/interfaces';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bodyweight',
  templateUrl: './bodyweight.component.html',
  styleUrl: './bodyweight.component.scss',
})
export class BodyweightComponent implements OnInit {
  bodyweights: IUserBodyweightDto[] = [];
  chart: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserBodyweightLog().subscribe({
      next: (data) => {
        this.bodyweights = data.reverse();

        const dateLabel = this.bodyweights.map((value) => {
          const date = new Date(value.date);
          const month = date.getMonth() + 1;
          const day = date.getDate();

          return `${day}.${month}`;
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dateLabel.reverse(),
            datasets: [
              {
                label: 'Bodyweight',
                data: this.bodyweights.map((value) => value.bodyweight),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          },
        });
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
