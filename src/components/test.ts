import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'test',
  standalone: true,
  imports: [FormsModule],
  template:`
     <button (click)="updateCount(-1)">-</button>
    <span>{{ count }}</span>
    <button (click)="updateCount(+1)">+</button>
  `
,
})

export class ButtonUsage  {
 @Input() count:any;
  @Output() countChange = new EventEmitter<string>();
  updateCount(amount: number): void {
    this.count += amount;

    this.countChange.emit(this.count);
  }


  }