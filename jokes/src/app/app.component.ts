import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

update: boolean =false;

  constructor(updates: SwUpdate){
    updates.available.subscribe(event=>{
     //this.update = true;

     updates.activateUpdate().then(() => document.location.reload());
    })
  }
}
