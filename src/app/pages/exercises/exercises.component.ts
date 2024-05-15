import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ILiftDataDto } from '../../common/interfaces';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent implements OnInit {
  liftData?: ILiftDataDto;
  chartData: any[] = [];
  chartLabels: string[] = [];

  constructor(private exerciseService: ExerciseService) {}

  async ngOnInit(): Promise<void> {
    this.liftData = await this.getLiftData();

    this.initChart();
  }

  initChart() {
    if (this.liftData) {
      const benchPressLabels = this.liftData.benchPress.map(
        (entry: any) => entry.date
      );
      const benchPressData = [
        {
          label: 'Bench Press',
          data: this.liftData.benchPress.map((entry: any) => entry.weight),
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        },
      ];

      const squatLabels = this.liftData.squat.map((entry: any) => entry.date);
      const squatData = [
        {
          label: 'Squat',
          data: this.liftData.squat.map((entry: any) => entry.weight),
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
        },
      ];

      const deadliftLabels = this.liftData.deadlift.map(
        (entry: any) => entry.date
      );
      const deadliftData = [
        {
          label: 'Deadlift',
          data: this.liftData.deadlift.map((entry: any) => entry.weight),
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
        },
      ];

      const ohpLabels = this.liftData.ohp.map((entry: any) => entry.date);
      const ohpData = [
        {
          label: 'OHP',
          data: this.liftData.ohp.map((entry: any) => entry.weight),
          borderColor: 'rgb(153, 102, 255)',
          fill: false,
        },
      ];

      this.chartLabels = [
        ...benchPressLabels,
        ...squatLabels,
        ...deadliftLabels,
        ...ohpLabels,
      ];
      this.chartData = [
        ...benchPressData,
        ...squatData,
        ...deadliftData,
        ...ohpData,
      ];
    }
  }

  async getLiftData(): Promise<ILiftDataDto> {
    return this.exerciseService.getLiftData().toResult();
  }
}
