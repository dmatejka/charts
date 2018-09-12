import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ChartComponent } from './chart/chart.component';
import { ArcComponent } from './arc/arc.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ArcComponent
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
