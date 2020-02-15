import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShareDataService } from '../../services/share-data.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit
{
  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  isMobile: boolean;
  isSmall: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
      public shareDataService: ShareDataService, public router: Router) 
  {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
    .subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall])
      {
        this.isMobile = true;
        this.isSmall = false;
      }
      else if (result.breakpoints[Breakpoints.Small])
      {
        this.isSmall = true;
        this.isMobile = false;
      }
      else
      {
        this.isSmall = false;
        this.isMobile = false;
      }
    });
  }

  ngAfterViewInit()
  {
    const sidenavOpened = this.router.url === '/login' || this.isMobile || this.isSmall ? false :  true;

    if (sidenavOpened)
    {
      this.drawer.toggle();
    }
  }
}
