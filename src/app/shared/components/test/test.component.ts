import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of, delay, concatMap, toArray, scan, timer, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  items$!: Observable<string[]>;
  private itemsSubject = new BehaviorSubject<string[]>([]);
  ngOnInit() {
    // Example data array
    const messages = Array(0).fill(0).map((_, i) => `Message #${i + 1}`);

    timer(0, 0).pipe(
      concatMap((_, i) => of(messages[i]).pipe()),
      scan((acc, message) => [...acc, message], [] as string[])
    ).subscribe(newItems => this.itemsSubject.next(newItems));
  }


  trackfn(index: number, item: any): number {
    return index; // or item.id if there's an id property
  }
}
