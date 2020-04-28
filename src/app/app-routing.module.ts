import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { GetStockComponent } from './get-stock/get-stock.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{path:'', component:WelcomeComponent},{path:'newSale', component:NewSaleComponent},
{path: 'addStock' , component: AddStockComponent},
{path: 'getStock', component: GetStockComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
