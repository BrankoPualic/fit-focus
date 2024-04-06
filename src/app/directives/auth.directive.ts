import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective implements OnInit, OnDestroy {
  sub?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.$signedinUser.subscribe({
      next: (user) => {
        if (user) this.viewContainerRef.createEmbeddedView(this.templateRef);
        else if (localStorage.getItem('user')) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
