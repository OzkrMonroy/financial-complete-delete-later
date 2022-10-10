import { ButtonComponent } from '@/app/components/button/button.component';
import { InputAlertsComponent } from '@/app/components/input-alerts/input-alerts.component';
import { InputComponent } from '@/app/components/input/input.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DpiPageComponent } from './dpi-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DpiPageComponent', () => {
  let component: DpiPageComponent;
  let fixture: ComponentFixture<DpiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpiPageComponent, InputComponent, ButtonComponent, InputAlertsComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
