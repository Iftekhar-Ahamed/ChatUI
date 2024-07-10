import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NgClass, AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf,RouterModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  lastMessage : string = "";
  isAlive: boolean = true;
  route :string ='';

  constructor(private store: Store,private router:Router,private activeRouter:ActivatedRoute) {
    
  }

  onSelect(): void {
    this.router.navigate(["search"], { relativeTo: this.activeRouter });
  }

  ngOnInit() {
  }

  ngDistroy() 
  {
    this.isAlive = false;
  }
}
