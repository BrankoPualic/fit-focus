import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private bodyweightLog = new BehaviorSubject<{
    label: string;
    bw: number;
    bf: number | null;
  } | null>(null);
  bodyweightLog$ = this.bodyweightLog.asObservable();

  constructor() {}

  setNewBodyweightLog({
    label,
    bw,
    bf,
  }: {
    label: string;
    bw: number;
    bf: number | null;
  }) {
    bf
      ? this.bodyweightLog.next({ label, bw, bf: null })
      : this.bodyweightLog.next({ label, bw, bf });
  }

  getBodyweightDateLabel(dateValue: string): string {
    const date = new Date(dateValue);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}.${month}`;
  }
}
