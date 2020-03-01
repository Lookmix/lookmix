import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(public router: Router, 
      public shareDataService: ShareDataService) { }

  ngOnInit()
  {}

  getAbsolutePath(imageName)
  {
    return environment.logoAssetsPath + imageName;
  }
}
