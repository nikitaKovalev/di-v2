import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Navigation } from '@common/navigation/navigation.interface';
import { NAVIGATION_MODULE_IMPORTS } from '@common/navigation/navigation.imports';

@Component({
  standalone: true,
  imports: NAVIGATION_MODULE_IMPORTS,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  readonly links: Navigation[] = [
    { name: 'Users', path: '/user' },
    { name: 'Todos', path: '/todo' },
    { name: 'Posts', path: '/post' },
  ];

  readonly isHandset$: Observable<boolean> =
    inject(BreakpointObserver).observe(Breakpoints.Handset).pipe(
      map(result => result.matches),
      shareReplay()
    );
}
