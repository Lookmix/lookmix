import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit 
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
      public shareDataService: ShareDataService) { }

  ngOnInit() {}

}
