import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndLayoutComponent } from './front-end-layout.component';

describe('FrontEndLayoutComponent', () => {
  let component: FrontEndLayoutComponent;
  let fixture: ComponentFixture<FrontEndLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontEndLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEndLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
