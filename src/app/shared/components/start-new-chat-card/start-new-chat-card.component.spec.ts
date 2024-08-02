import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewChatCardComponent } from './start-new-chat-card.component';

describe('StartNewChatCardComponent', () => {
  let component: StartNewChatCardComponent;
  let fixture: ComponentFixture<StartNewChatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartNewChatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartNewChatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
