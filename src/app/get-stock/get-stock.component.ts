import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-stock',
  templateUrl: './get-stock.component.html',
  styleUrls: ['./get-stock.component.css']
})
export class GetStockComponent implements OnInit {
  public _getmedData;
  public _nameRecommend : any;
  public _total : number;
  public _fullTotal : number;
  public check : number=0;
  public _getFullStock;
  constructor(private http : HttpClient) { }

  ngOnInit() {
  }
  getStockForm = new FormGroup({
    name  : new FormControl(''),
    categ : new FormControl('')
  }) 

  getMedDetails(){
    
    this.http.post('http://localhost:8080/imsgetmedstock', this.getStockForm.value).subscribe(result=>{
    console.log(result);
    this._getmedData = result['op'];
    if(this._getmedData.length >0)
    {
      this.check=1;
      this._total = result['quant'];
    }
    else{
      this.check = 2;
    }

    });
  }
  getFullStock(){
    this.http.get('http://localhost:8080/getFullStock').subscribe(result=>{
      this._getmedData = result['op'];
      if(this._getmedData.length>0)
      {
        this._total = result['quant'];
      }
    });
  }
  getItem()
  {
    if(this.getStockForm.value.name.length>=2)
    {
   this.http.post('http://localhost:8080/imsgetlive', this.getStockForm.value).subscribe(result=>{
  console.log(result);
      this._nameRecommend = result;
   }); 
  }
  }
}
