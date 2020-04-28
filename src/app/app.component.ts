import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory';
  constructor(private router: Router, private route: ActivatedRoute){}
  newSales()
  {
    this.router.navigate(['/newSale'], {relativeTo: this.route});
  }
  goHome()
  {
    this.router.navigate(['/'],{relativeTo: this.route});
  }
  addStock()
  {
    this.router.navigate(['/addStock'], {relativeTo: this.route});
  }
  getStock()
  {
    this.router.navigate(['/getStock'], {relativeTo: this.route});
  }
}
