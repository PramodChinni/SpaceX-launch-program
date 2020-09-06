import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardsComponentComponent } from './cards-component/cards-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
