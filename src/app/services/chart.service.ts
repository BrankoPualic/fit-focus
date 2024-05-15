import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private bodyweightLog = new BehaviorSubject<{
    label: string;
    value: number;
    datasetLabel: string;
  } | null>(null);
  bodyweightLog$ = this.bodyweightLog.asObservable();

  constructor(private datePipe: DatePipe) {}

  setNewBodyweightLog({
    label,
    value,
    datasetLabel,
  }: {
    label: string;
    value: number;
    datasetLabel: string;
  }) {
    this.bodyweightLog.next({ label, value, datasetLabel });
  }

  getDateLabel(dateValue: string): string {
    return this.datePipe.transform(dateValue, 'yyyy-MM-dd')!;
  }
}
