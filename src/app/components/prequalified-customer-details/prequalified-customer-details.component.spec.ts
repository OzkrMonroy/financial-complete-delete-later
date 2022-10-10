import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrequalifiedCustomerDetailsComponent } from './prequalified-customer-details.component';

describe('PrequalifiedCustomerDetailsComponent', () => {
  let component: PrequalifiedCustomerDetailsComponent;
  let fixture: ComponentFixture<PrequalifiedCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrequalifiedCustomerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequalifiedCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
