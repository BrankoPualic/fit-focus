import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IWorkoutDto } from '../../common/interfaces';
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
  editingSet: any;

  totalItems = 0;
  currentPage = 1;

  constructor(
    private modalService: BsModalService,
    private workoutService: WorkoutService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initWorkoutsData();
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

  openWorkoutModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  editExercise(set: any, template: any) {
    this.editingSet = set;
    this.openWorkoutModal(template);
  }

  setPage(page: any) {
    const pageSize = 3 * (page.page - 1);
    this.workouts = this.allWorkouts.slice(pageSize, pageSize + 3);
  }

  private showFirst3() {
    if (this.totalItems > 3 && this.currentPage === 1) {
      this.workouts = this.workouts.slice(0, 3);
    }
  }
}
