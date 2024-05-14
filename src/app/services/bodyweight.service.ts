import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserBodyweightDto } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BodyweightService {
  private bodyweightLog = new BehaviorSubject<IUserBodyweightDto | null>(null);
  bodyweightLog$ = this.bodyweightLog.asObservable();

  constructor() {}

  setNewBodyweightLog(data: IUserBodyweightDto) {
    this.bodyweightLog.next(data);
  }
}
