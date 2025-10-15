import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsLogin } from './forms-login';

describe('FormsLogin', () => {
  let component: FormsLogin;
  let fixture: ComponentFixture<FormsLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
