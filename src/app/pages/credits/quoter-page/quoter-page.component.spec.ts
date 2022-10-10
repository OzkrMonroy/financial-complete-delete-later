import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoterPageComponent } from './quoter-page.component';

describe('QuoterPageComponent', () => {
  let component: QuoterPageComponent;
  let fixture: ComponentFixture<QuoterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
