import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserBodyweightDto } from '../common/interfaces';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class BodyweightService {
  private bodyweightLog = new BehaviorSubject<IUserBodyweightDto | null>(null);
  bodyweightLog$ = this.bodyweightLog.asObservable();

  constructor(private dataService: DataService) {}

  setNewBodyweightLog(data: IUserBodyweightDto) {
    this.bodyweightLog.next(data);
  }

  getUserBodyweightLog() {
    return this.dataService.get<IUserBodyweightDto[]>(
      'assets/data/bodyweight.json'
    );
  }
}
