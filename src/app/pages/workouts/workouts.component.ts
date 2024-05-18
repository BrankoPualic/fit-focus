import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEditSetDto, ISetDto, IWorkoutDto } from '../../common/interfaces';
import { Subscription } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit {
  workouts: IWorkoutDto[] = [];
  allWorkouts: IWorkoutDto[] = [];
  modalRef?: BsModalRef;
  editingSet = {} as IEditSetDto;

  totalItems = 0;
  currentPage = 1;

  constructor(
    private modalService: BsModalService,
    private workoutService: WorkoutService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initWorkoutsData();

    this.subscriptionForEditSet();
  }

  async initWorkoutsData() {
    this.workouts = (await this.getWorkoutsData()).reverse();
    this.allWorkouts = this.workouts;
    this.totalItems = this.allWorkouts.length;

    this.showFirst3();
  }

  async getWorkoutsData(): Promise<IWorkoutDto[]> {
    return this.workoutService.getAllWorkouts().toResult();
  }

  subscriptionForEditSet() {
    this.workoutService.editSet$.subscribe({
      next: (data) => {
        if (data) {
          this.updateGrid(data);
        }
      },
    });
  }

  openWorkoutModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  editExercise(
    exerciseName: string,
    date: string,
    set: ISetDto,
    exerciseIndex: number,
    setIndex: number,
    template: any
  ) {
    this.editingSet = {
      name: exerciseName,
      date,
      set,
      exerciseIndex,
      setIndex,
    };
    this.openWorkoutModal(template);
  }

  setPage(page: any) {
    const pageSize = 3 * (page.page - 1);
    this.workouts = this.allWorkouts.slice(pageSize, pageSize + 3);
  }

  private updateGrid(data: IEditSetDto) {
    this.workouts.forEach((el) => {
      if (
        el.date === data.date &&
        el.exercises[data.exerciseIndex].name === data.name
      ) {
        el.exercises[data.exerciseIndex].sets[data.setIndex] = data.set;
      }
    });
  }

  private showFirst3() {
    if (this.totalItems > 3 && this.currentPage === 1) {
      this.workouts = this.workouts.slice(0, 3);
    }
  }
}
