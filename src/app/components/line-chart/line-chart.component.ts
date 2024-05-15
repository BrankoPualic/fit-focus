import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import Chart, { Legend, plugins } from 'chart.js/auto';
import { ChartService } from '../../services/chart.service';
import { Subscription } from 'rxjs';
import { DATASET_LABELS } from '../../common/constants';

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
        if (newValues) {
          this.updateChart(
            newValues.label,
            newValues.value,
            newValues.datasetLabel
          );
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
  private createChart(labels: string[], datasets: any[]): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }

  private updateChart(label: string, newData: any, datasetLabel: string): void {
    const datasetIndex = this.chart.data.datasets.findIndex(
      (dataset: any) => dataset.label === datasetLabel
    );
    if (datasetIndex !== -1) {
      const index = this.chart.data.labels.indexOf(label);
      if (index !== -1) {
        this.chart.data.datasets[datasetIndex].data[index] = newData;
      } else {
        this.chart.data.labels.push(label);
        this.chart.data.datasets[datasetIndex].data.push(newData);
      }

      const chartData = this.chart.data.labels.map(
        (label: any, index: number) => ({
          label,
          data: this.chart.data.datasets[datasetIndex].data[index],
        })
      );

      chartData.sort(
        (a: any, b: any) =>
          new Date(a.label).getTime() - new Date(b.label).getTime()
      );

      this.chart.data.labels = chartData.map((entry: any) => entry.label);
      this.chart.data.datasets[datasetIndex].data = chartData.map(
        (entry: any) => entry.data
      );

      this.chart.update();
    }
  }
}
