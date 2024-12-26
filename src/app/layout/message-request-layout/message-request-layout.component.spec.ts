import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRequestLayoutComponent } from './message-request-layout.component';

describe('MessageRequestLayoutComponent', () => {
  let component: MessageRequestLayoutComponent;
  let fixture: ComponentFixture<MessageRequestLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageRequestLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageRequestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
