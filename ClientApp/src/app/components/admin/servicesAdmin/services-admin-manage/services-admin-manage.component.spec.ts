import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAdminManageComponent } from './services-admin-manage.component';

describe('ServicesAdminManageComponent', () => {
  let component: ServicesAdminManageComponent;
  let fixture: ComponentFixture<ServicesAdminManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAdminManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAdminManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
