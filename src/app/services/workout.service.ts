import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IWorkoutDto } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private dataService: DataService) {}

  getAllWorkouts() {
    return this.dataService.get<IWorkoutDto[]>('assets/data/workouts.json');
  }
}
