import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private bodyweightLog = new BehaviorSubject<{
    label: string;
    bw: number;
  } | null>(null);
  bodyweightLog$ = this.bodyweightLog.asObservable();

  constructor() {}

  setNewBodyweightLog({ label, bw }: { label: string; bw: number }) {
    this.bodyweightLog.next({ label, bw });
  }
}
