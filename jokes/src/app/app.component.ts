import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
update: boolean =false;
joke: any;

  constructor(updates: SwUpdate,private service: DataService,){
    updates.available.subscribe(event=>{
     //this.update = true;

     updates.activateUpdate().then(() => document.location.reload());
    })
  }
  private errorMessage: string;
  
  private xmlString: string;
  private xml: string;
  ngOnInit(){
    function parseXml(xmlString) {
      return new (<any>window).DOMParser().parseFromString(xmlString, "text/xml");
   }
    this.service.getXml().subscribe(
      data=> {
        var xml = parseXml(data);
        alert(this.xml);
        new XMLSerializer().serializeToString(xml.documentElement);
        console.log("Data",xml)
      },
      error => {
        this.errorMessage = error;
        console.log("Errror",this.errorMessage)
      
      }
    )
  }
}
