import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
update: boolean =false;
joke: any;

  constructor(updates: SwUpdate,private service: DataService,private ngxXml2jsonService: NgxXml2jsonService){
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
        var xmlDoc = xml;

        document.getElementById("doc").textContent = new XMLSerializer().serializeToString(xmlDoc);
        document.getElementById("documentElement").textContent = new XMLSerializer().serializeToString(xmlDoc.documentElement);

        new XMLSerializer().serializeToString(xml.documentElement);

        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        console.log(obj);
        console.log("Data",xml)
      },
      error => {
        this.errorMessage = error;
        console.log("Errror",this.errorMessage)
      
      }
    )
  }
}
