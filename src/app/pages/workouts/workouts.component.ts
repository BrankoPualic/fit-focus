import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEditSetDto, ISetDto, IWorkoutDto } from '../../common/interfaces';
import { Subscription, map } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';
import { DatePipe } from '@angular/common';

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
    private workoutService: WorkoutService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initWorkoutsData();

    this.subscriptionForEditSet();
    this.subscriptionForNewWorkout();
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

  subscriptionForNewWorkout() {
    this.workoutService.newWorkout$
      .pipe(
        map((workout) => {
          if (workout) {
            workout.date = this.datePipe.transform(
              workout.date,
              'yyyy-MM-ddTHH:mm:ss.SSSZ'
            )!;
          }
          return workout;
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.updateGridWithNewWorkout(data);
          }
        },
      });
  }

  openWorkoutModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  editExercise(
    name: string,
    date: string,
    set: ISetDto,
    exerciseIndex: number,
    setIndex: number,
    template: any
  ) {
    this.editingSet = {
      name,
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

  private updateGridWithNewWorkout(data: IWorkoutDto) {
    this.allWorkouts.unshift(data);

    this.allWorkouts = this.allWorkouts.sort((a, b) => {
      console.log(this.allWorkouts);
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else return 0;
    });

    this.workouts = [...this.allWorkouts];

    this.totalItems = this.allWorkouts.length;

    this.showFirst3();
  }

  private showFirst3() {
    if (this.totalItems > 3 && this.currentPage === 1) {
      this.workouts = this.workouts.slice(0, 3);
    }
  }
}
