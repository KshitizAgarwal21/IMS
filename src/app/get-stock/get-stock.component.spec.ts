import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStockComponent } from './get-stock.component';

describe('GetStockComponent', () => {
  let component: GetStockComponent;
  let fixture: ComponentFixture<GetStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
