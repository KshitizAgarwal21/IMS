import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { GetStockComponent } from './get-stock/get-stock.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NewSaleComponent,
    AddStockComponent,
    GetStockComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
