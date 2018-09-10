import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { SunburstComponent } from './sunburst/sunburst.component';

@NgModule({
  declarations: [
    AppComponent,
    SunburstComponent
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
