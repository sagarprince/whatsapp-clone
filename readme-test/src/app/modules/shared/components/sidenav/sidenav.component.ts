import { 
    Component, 
    OnInit, 
    Inject,
    Input, 
    ViewChild, 
    HostListener,
    ViewEncapsulation    
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

import { MdSidenav } from "@angular/material";

interface Menus {
  name: string;
  link: string;
  icon: string;
  submenus?: Array<any>;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidenavComponent implements OnInit {

    @Input('menus') menus: Array<Menus> = [];

    @Input('sidenav') sidenav: MdSidenav;

    constructor(@Inject(DOCUMENT) private _doc) { }

    ngOnInit() { 
        this.changeNavMenuSettings();

        setTimeout(() => {
            this.collapsedContainer();
        }, 2);          

        // Subscribe for Sidenav OpenStart Event Emitter
        this.sidenav.onOpenStart.subscribe(() => {         
            this._doc.querySelector('.mat-sidenav-content').classList.remove('opened');
            this._doc.querySelector('.mat-sidenav-content').classList.add('opening');        
        });

        // Subscribe for Sidenav onOpen Event Emitter
        this.sidenav.onOpen.subscribe(() => {         
            this._doc.querySelector('.mat-sidenav-content').classList.remove('opening');        
            this._doc.querySelector('.mat-sidenav-content').classList.add('opened');        
        });

        // Subscribe for Sidenav onClose Event Emitter
        this.sidenav.onClose.subscribe(() => {
            this.collapsedContainer();

            this.menus.forEach((menu: any) => {
                menu.subMenuOpened = false;
            });
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.collapsedContainer();
        this.changeNavMenuSettings();
    }

    gotoMenu() {
        if (this.sidenav.mode === 'push' && this.sidenav._opened && window.innerWidth < 992) {
            this.sidenav.close();
        }
    }

    openSubmenu(menu: any) {
        menu.subMenuOpened = !menu.subMenuOpened;
        if (!this.sidenav._opened) {
            this.sidenav.toggle();
        }
        return false;
    }

    collapsedContainer() {
        if (!this.sidenav._opened && window.innerWidth > 991) {   
            this._doc.querySelector('.mat-sidenav-content').style.marginLeft = '64px';      
        } else if (window.innerWidth < 992) {
            this._doc.querySelector('.mat-sidenav-content').style.marginLeft = '0px';      
        }
    }

    changeNavMenuSettings() {        
        if (window.innerWidth < 992) {
            this.sidenav.mode = 'push';
            this.sidenav.close();            
        } else {            
            setTimeout(()=>{
                this.sidenav.mode = 'side';
                this._doc.querySelector('.mat-sidenav').classList.remove('mat-sidenav-opening');
                this._doc.querySelector('.mat-sidenav').classList.add('mat-sidenav-opened');                        
                this.sidenav.open();
            }, 100);                        
        }
    }

}
