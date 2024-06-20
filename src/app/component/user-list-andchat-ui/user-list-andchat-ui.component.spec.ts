import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListAndchatUiComponent } from './user-list-andchat-ui.component';

describe('UserListAndchatUiComponent', () => {
  let component: UserListAndchatUiComponent;
  let fixture: ComponentFixture<UserListAndchatUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListAndchatUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListAndchatUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
