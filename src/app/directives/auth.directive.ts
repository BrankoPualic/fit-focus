import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const user_ls = localStorage.getItem('user');
    if (!user_ls) {
      this.authService.$signedinUser.subscribe({
        next: (user) => {
          if (user) this.viewContainerRef.createEmbeddedView(this.templateRef);
          else this.viewContainerRef.clear();
        },
      });
    } else if (user_ls) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else this.viewContainerRef.clear();
  }
}
