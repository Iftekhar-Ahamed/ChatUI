import { Component, Input } from '@angular/core';
import { SearchedUserResult } from '../../models/userAction.model';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-user-card.component.html',
  styleUrl: './search-user-card.component.css'
})
export class SearchUserCardComponent {

  @Input() user!: SearchedUserResult;
  

  constructor(private store: Store,private router:Router,private activeRouter:ActivatedRoute) 
  {
    
  }

  get avatar(): string 
  {
    return `assets/${this.user.avatar}`;
  }

  onSelect(): void {
    //this.router.navigate([this.user.id], { relativeTo: this.activeRouter });
  }

  ngOnInit() {
  }

  ngDistroy() 
  {
  }
}
