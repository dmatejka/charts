import { Component } from '@angular/core';
import * as ds from './data.service';

@Component({
  selector: 'charts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a-d3-angular-d3';
  public width = 800;
  public height = 600;
  public data = [];

  constructor( public servicedata:ds.DataService){
    this.data = servicedata.data;
    console.log(this.data)
  }
}
