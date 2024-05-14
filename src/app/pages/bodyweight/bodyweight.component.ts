import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserBodyweightDto } from '../../common/interfaces';
import { ChartService } from '../../services/chart.service';
import { BodyweightService } from '../../services/bodyweight.service';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bodyweight',
  templateUrl: './bodyweight.component.html',
  styleUrl: './bodyweight.component.scss',
})
export class BodyweightComponent implements OnInit {
  bodyweights: IUserBodyweightDto[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];
  editingObj?: IUserBodyweightDto;
  totalItems: number = 0;
  currentPage = 1;
  allBodyweights: IUserBodyweightDto[] = [];
  modalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private chartService: ChartService,
    private bodyweightService: BodyweightService,
    private datePipe: DatePipe,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.userService.getUserBodyweightLog().subscribe({
      next: (data) => {
        this.bodyweights = data.reverse();
        this.allBodyweights = this.bodyweights;
        this.totalItems = this.allBodyweights.length;

        this.showFirst8();

        this.chartLabels = this.bodyweights
          .map((value) => {
            return this.chartService.getBodyweightDateLabel(value.date);
          })
          .reverse();

        this.chartData = this.bodyweights
          .map((value) => value.bodyweight)
          .reverse();
      },
    });

    this.subscriptionForBodyweightService();
  }

  subscriptionForBodyweightService() {
    this.bodyweightService.bodyweightLog$.subscribe({
      next: (data) => {
        if (data) {
          this.updateGrid(data);
        }
      },
    });
  }

  getLatestBodyFatLog(): number | null {
    const filteredLogs = this.allBodyweights.filter(
      (log) => log.bodyfat !== null
    );

    filteredLogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return filteredLogs.length > 0 ? filteredLogs[0].bodyfat : null;
  }

  openBwModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  editLog(obj: IUserBodyweightDto, template: any) {
    this.editingObj = obj;
    this.openBwModal(template);
  }

  setPage(page: any) {
    const pageSize = 8 * (page.page - 1);
    this.bodyweights = this.allBodyweights.slice(pageSize, pageSize + 8);
  }

  private updateGrid(data: IUserBodyweightDto): void {
    let exist = false;
    let indexOfObj = 0;
    let dateString = '';

    this.allBodyweights.forEach((el, index) => {
      if (el.date === this.datePipe.transform(data.date, 'yyyy-MM-dd')) {
        exist = true;
        indexOfObj = index;
        dateString = this.datePipe.transform(data.date, 'yyyy-MM-dd')!;
      }
    });

    if (exist) {
      this.allBodyweights[indexOfObj] = { ...data, date: dateString };
    } else {
      this.allBodyweights.unshift({
        ...data,
        date: this.datePipe.transform(data.date, 'yyyy-MM-dd')!,
      });
    }

    this.bodyweights = [...this.allBodyweights];

    this.totalItems = this.allBodyweights.length;
    this.showFirst8();
  }

  private showFirst8() {
    if (this.totalItems > 8 && this.currentPage === 1) {
      this.bodyweights = this.bodyweights.slice(0, 8);
    }
  }
}
