import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSingUp } from './forms-sing-up';

describe('FormsSingUp', () => {
  let component: FormsSingUp;
  let fixture: ComponentFixture<FormsSingUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsSingUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsSingUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
