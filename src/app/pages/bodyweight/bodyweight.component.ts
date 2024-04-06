import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserBodyweightDto } from '../../common/interfaces';

@Component({
  selector: 'app-bodyweight',
  templateUrl: './bodyweight.component.html',
  styleUrl: './bodyweight.component.scss',
})
export class BodyweightComponent implements OnInit {
  bodyweights: IUserBodyweightDto[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserBodyweightLog().subscribe({
      next: (data) => (this.bodyweights = data.reverse()),
    });
  }

  logBodyweight() {
    this.bodyweights.unshift({
      date: '2024-11-04',
      bodyweight: 88,
      bodyfat: null,
    });
  }

  getLatestBodyfatLog(): number | null {
    const filteredLogs = this.bodyweights.filter((log) => log.bodyfat !== null);

    filteredLogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return filteredLogs.length > 0 ? filteredLogs[0].bodyfat : null;
  }
}
