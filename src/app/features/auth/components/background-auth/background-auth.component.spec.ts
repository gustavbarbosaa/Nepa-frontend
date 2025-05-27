import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundAuthComponent } from './background-auth.component';

describe('BackgroundAuthComponent', () => {
  let component: BackgroundAuthComponent;
  let fixture: ComponentFixture<BackgroundAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
