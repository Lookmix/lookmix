import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShareDataService } from '../../services/share-data.service';
import { Router, } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit
{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  backgrounds = 
  {
    login: '#ffb6c1ad', //#f873ad (v2)   #ffb6c1ad   #fcd4da   lightpink
    novaconta: '#8341a1d4'//  #8341a1   #8341a1d4   #7941a1a1   #7941a1   '#4b0082bd'
  }

  constructor(private breakpointObserver: BreakpointObserver,
      public shareDataService: ShareDataService, public router: Router) 
  {}

  ngOnInit()
  {}

  exibirMenu() 
  {
    return !this.isInvalidRoute() && !this.isMobile();
  }

  setBackground()
  {
    const background = this.backgrounds[this.router.url.replace('/', '').replace('-', '')]
    
    if (background && !this.shareDataService.temaNoturno)
    {
      return background;
    }
    return 'initial';
  }

  private isMobile()
  {
    return this.shareDataService.isSmall || this.shareDataService.isXSmall;
  }

  private isInvalidRoute()
  {
    return this.router.url === '/login' || this.router.url === '/nova-conta' ||
        this.router.url === '/';
  }
}
