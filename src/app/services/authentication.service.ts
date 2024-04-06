import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IUserSigninDto } from '../common/interfaces';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private signedinUser = new BehaviorSubject<IUserSigninDto | null>(null);
  $signedinUser = this.signedinUser.asObservable();

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  signin(userDto: IUserSigninDto) {
    this.dataService
      .get<IUserSigninDto>('assets/data/user-signin.json')
      .subscribe({
        next: (user) => {
          if (
            userDto.emailAddress === 'test@test.test' &&
            userDto.password === 'test123'
          ) {
            this.signedinUser.next(user);
            this.toastr.success('Successfully signed in.', 'Welcome!');
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigateByUrl('profile');
          } else
            this.toastr.error(
              'Please use Demo user for signing in.',
              'Failed to sign in'
            );
        },
      });
  }

  signout() {
    localStorage.removeItem('user');
    this.signedinUser.next(null);
    this.router.navigateByUrl('authentication');
  }
}
