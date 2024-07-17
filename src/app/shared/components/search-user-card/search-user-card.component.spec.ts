import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserCardComponent } from './search-user-card.component';

describe('SearchUserCardComponent', () => {
  let component: SearchUserCardComponent;
  let fixture: ComponentFixture<SearchUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
