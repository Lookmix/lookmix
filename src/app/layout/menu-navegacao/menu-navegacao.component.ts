import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-menu-navegacao',
  templateUrl: './menu-navegacao.component.html',
  styleUrls: ['./menu-navegacao.component.scss']
})
export class MenuNavegacaoComponent implements OnInit 
{
  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    public shareDataService: ShareDataService) 
  {
    iconRegistry.addSvgIcon('guarda-roupa',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/guarda-roupa.svg'));
  }

  ngOnInit(): void 
  {}

}
