import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ILiftDataDto } from '../common/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private dataService: DataService) {}

  getLiftData(): Observable<ILiftDataDto> {
    return this.dataService.get<ILiftDataDto>('assets/data/exercises.json');
  }
}
