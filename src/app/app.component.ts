import { Component } from '@angular/core';
import { ShareDataService } from './services/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{

  constructor(public shareDataService: ShareDataService)
  {
    
  }

}