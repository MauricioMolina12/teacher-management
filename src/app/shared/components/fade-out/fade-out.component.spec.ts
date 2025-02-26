import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeOutComponent } from './fade-out.component';

describe('FadeOutComponent', () => {
  let component: FadeOutComponent;
  let fixture: ComponentFixture<FadeOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FadeOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FadeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
