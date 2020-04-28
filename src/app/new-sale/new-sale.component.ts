import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {
  public _nameRecommend;
  public _fullrecommend;
  public selectitemdata;
  
  public _cname : string;
  public _iName : string;
  public _checkname: string;
  public printarr: any[] = [];
  public inamedata : string[] =[];
  public categorydata : string[];
  public batchdata  : string[];
  public quantdata : number[] = [];
  public mrpdata : number[];
  public datedata : Date[];
  public amountdata : number[] = [];
  public counter : number[] = [];
  public c : number;
  public total : number = 0;
  public check : number;
  public amount : number;
  public checkquant: number;
  SalesForm = new FormGroup({
    cname : new FormControl(''),
    dname : new FormControl(''),
    name : new FormControl(''),
    batch : new FormControl(''),
    quant : new FormControl('')

  })
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.c = 0;
  }

    getItem()
  {
    if(this.SalesForm.value.name.length>=2)
    {
   this.http.post('http://localhost:8080/imsgetlive', this.SalesForm.value).subscribe(result=>{
  console.log(result);
      this._nameRecommend = result;
   }); 
  }
  }
  getFullRecommendation(){
    if(this.SalesForm.value.batch.length>=1)
    {
    this.http.post('http://localhost:8080/imsgetfulldata', this.SalesForm.value).subscribe(result=>{
      console.log(result);
      this._fullrecommend = result;
      
    })
  }
  }

  addItem(){

      this.http.post('http://localhost:8080/selectitemdata', this.SalesForm.value).subscribe(result=>{
        console.log(result);
        if(result['message']== 'Out of stock')
        {
          console.log("oos");
          this.checkquant = 1;
        }
        else{
          this.checkquant=2;
          this.selectitemdata = result;
          this.quantdata.push(this.SalesForm.value.quant);
          this.printarr.push(this.selectitemdata[0]);
          this.amount  = this.SalesForm.value.quant*(this.selectitemdata[0].price - (0.05* this.selectitemdata[0].price));
          console.log(this.amount);
          this.total += this.amount;
          this.amountdata.push(this.amount);
          console.log(this.total);
        }
      })

  }
  getBill(){
    this.check = 1;

  }
}

