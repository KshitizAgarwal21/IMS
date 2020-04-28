import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  public itemData;
  public _nameRecommend : any;
  public updatedCount : number;
  public newBatch : boolean;
  public newItem : boolean;
  public updateQuant : boolean;
  public _name : string = null;
  public _category : string = null;
  public _batch : string=null;
  public _expdate : Date=null;
  public _quant : number=null;
  public _price : number=null;
  public _errormsg : string=null;
  constructor(private http : HttpClient) { }

  ngOnInit() {
    
  }
  stockAddForm = new FormGroup({
    name : new FormControl(''),
    category : new FormControl(''),
    quant : new FormControl(''),
    price : new FormControl(''),
    batch : new FormControl(''),
    expdate : new FormControl('')
  })

  addStock(){
    this._errormsg = null;
    this._name = this.stockAddForm.value.name.toUpperCase();
    this._category = this.stockAddForm.value.category.toUpperCase();
    this._batch = this.stockAddForm.value.batch.toUpperCase();
    this._expdate = this.stockAddForm.value.expdate;
    this._quant = this.stockAddForm.value.quant;
    this._price = this.stockAddForm.value.price;
    if(this.stockAddForm.value.name != "" && this.stockAddForm.value.category != "" && this.stockAddForm.value.batch != "" && this.stockAddForm.value.expdate != null && this.stockAddForm.value.price != null && this.stockAddForm.value.quant != null)
    {
    console.log(this.stockAddForm.value);
    this.http.post('http://localhost:8080/imspost', this.stockAddForm.value).subscribe(result=>{
      if(result['message'] == "Data updated Successfully")
      {
        this.newItem = false;
        this.newBatch = false;
        console.log("Stock updated successfully");
        this.updateQuant = true;
        this.updatedCount = result['quant'];
      }
      if(result['message'] == "New batch of item inserted")
      {
        this.updateQuant = false;
        this.newItem = false;
        console.log("new batch inserted");
        this.newBatch = true;
      }
      if(result['message'] == "Data added Successfully"){
        this.updateQuant = false;
        this.newBatch = false;
        console.log("New Item inserted");
        this.newItem = true;
      }
    })
  }
  else{
    this._errormsg = "Error";
  }
  }
  getItem()
  {
    if(this.stockAddForm.value.name.length>=2)
    {
   this.http.post('http://localhost:8080/imsgetlive', this.stockAddForm.value).subscribe(result=>{
  console.log(result);
      this._nameRecommend = result;
   }); 
  }
  }
}
