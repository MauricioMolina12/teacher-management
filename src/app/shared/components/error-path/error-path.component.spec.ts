import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPathComponent } from './error-path.component';

describe('ErrorPathComponent', () => {
  let component: ErrorPathComponent;
  let fixture: ComponentFixture<ErrorPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
