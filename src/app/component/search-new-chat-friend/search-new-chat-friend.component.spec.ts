import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNewChatFriendComponent } from './search-new-chat-friend.component';

describe('SearchNewChatFriendComponent', () => {
  let component: SearchNewChatFriendComponent;
  let fixture: ComponentFixture<SearchNewChatFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchNewChatFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchNewChatFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
