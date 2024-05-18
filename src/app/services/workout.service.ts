import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IEditSetDto, IWorkoutDto } from '../common/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private editSet = new BehaviorSubject<IEditSetDto | null>(null);
  editSet$ = this.editSet.asObservable();

  constructor(private dataService: DataService) {}

  getAllWorkouts() {
    return this.dataService.get<IWorkoutDto[]>('assets/data/workouts.json');
  }

  setEditedSet(data: IEditSetDto) {
    this.editSet.next(data);
  }
}
