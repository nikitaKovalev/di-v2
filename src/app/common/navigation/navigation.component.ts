import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Navigation } from '@common/navigation/navigation.interface';
import { NAVIGATION_MODULE_IMPORTS } from '@common/navigation/navigation.imports';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { expandWidth } from '@core/animations';
import { SEARCH_CONTROL } from '@core/tokens';

@Component({
  standalone: true,
  imports: NAVIGATION_MODULE_IMPORTS,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [expandWidth],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  readonly searchControl = inject(SEARCH_CONTROL)

  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  private readonly _title = inject(Title);

  get title(): string {
    return this._title.getTitle();
  }

  get isDetailsRouteActive(): boolean {
    return this._router.url.search(/\d|create/) !== -1;
  }

  onBack(): void {
    this._location.back();
  }

  onCreate() {
    this._router.navigate([this._router.url, 'create']);
  }
}
