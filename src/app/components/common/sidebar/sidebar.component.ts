import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl:'./sidebar.component.html',
    styleUrls:['./sidebar.component.style.css']
     
})
export class SidebarComponent {
  toggleButton: boolean = true;
  constructor(){}
 
  ngOnInit(){
   
  }

  private _opened: boolean = false;
  private _mode: string = 'push';

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}