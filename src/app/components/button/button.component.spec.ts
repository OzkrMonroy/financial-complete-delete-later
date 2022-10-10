import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return the classes for primary button', () => {
    component.buttonColor = 'primary';
    const color = component.getClasses()
    expect(color).toEqual(component.buttonColors.primary)
  })
  
  it('Should return the classes for secondary button', () => {
    component.buttonColor = 'secondary';
    const color = component.getClasses()
    expect(color).toEqual(component.buttonColors.secondary)
  })
  it('Should return the classes for disabled button', () => {
    component.buttonColor = 'disabled';
    const color = component.getClasses()
    expect(color).toEqual(component.buttonColors.disabled)
  })
  it('Should return the classes for link button', () => {
    component.buttonColor = 'link';
    const color = component.getClasses()
    expect(color).toEqual(component.buttonColors.link)
  })

  it('Should not call the event when the button color is disabled', () => {
    component.buttonColor = 'disabled';
    const emitSpy = spyOn(component.clickEvent, 'emit')
    component.click()
    expect(emitSpy).toHaveBeenCalledTimes(0)
  })
  it('Should call the event when the button color is not disabled', () => {
    component.buttonColor = 'primary';
    const emitSpy = spyOn(component.clickEvent, 'emit')
    component.click()
    expect(emitSpy).toHaveBeenCalledTimes(1)
  })
});
