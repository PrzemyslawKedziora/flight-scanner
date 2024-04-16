import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserFormComponent } from './browser-form.component';

describe('BrowserFormComponent', () => {
  let component: BrowserFormComponent;
  let fixture: ComponentFixture<BrowserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserFormComponent]
    });
    fixture = TestBed.createComponent(BrowserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
