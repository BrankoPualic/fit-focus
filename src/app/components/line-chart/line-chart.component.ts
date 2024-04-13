import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from '../../services/chart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  chart: any;
  @Input('labels') labels: string[] = [];
  @Input('data') data: any[] = [];
  private chartSubscription?: Subscription;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.createChart(this.labels, this.data);

    this.chartSubscription = this.chartService.bodyweightLog$.subscribe(
      (newValues) => {
        console.log(newValues);
        if (newValues) {
          this.updateChart(newValues.label, newValues.bw);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(labels: string[], data: any[]): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Bodyweight',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }

  private updateChart(label: string, newData: any): void {
    this.chart.data.labels.push(label);
    this.chart.data.datasets[0].data.push(newData);
    this.chart.update();
  }
}
