import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations.route';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  readonly ICONS_LIST = [
    {
      name: 'postpago',
      path: 'assets/claro/postpago.svg'
    },
    {
      name: 'prepago',
      path: 'assets/claro/prepago.svg'
    },
    {
      name: 'simcard',
      path: 'assets/claro/simcard.svg'
    },
    {
      name: 'simlte',
      path: 'assets/claro/simlte.svg'
    },
    {
      name: 'email',
      path: 'assets/claro/email.svg'
    },
    {
      name: 'phone',
      path: 'assets/claro/phone.svg'
    },
    {
      name: 'check',
      path: 'assets/claro/check.svg'
    },
    {
      name: 'warn',
      path: 'assets/claro/warn.svg'
    },
    {
      name: 'simok',
      path: 'assets/claro/simok.svg'
    }
  ];

  constructor(
    public loaderService: LoadingService,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
    private contexts: ChildrenOutletContexts,
  ){
    this.ICONS_LIST.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitzer.bypassSecurityTrustResourceUrl(icon.path)
      )
    });
  }

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
