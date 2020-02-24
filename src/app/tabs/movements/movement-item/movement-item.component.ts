import { Component, Input, OnInit } from '@angular/core';
import { Movement } from '../movements.model';

@Component({
  selector: 'app-movement-item',
  templateUrl: './movement-item.component.html',
  styleUrls: ['./movement-item.component.scss'],
})
export class MovementItemComponent implements OnInit {
  @Input() movement: Movement;
  icon: { name: string, class: string };

  constructor() {}

  ngOnInit() {
    const handler = Movement.getHandler(this.movement.type);
    this.icon = handler.getIcon();
    // this.icon = Movement.getIconAndClass(this.movement.type).icon;
    // this.class = Movement.getIconAndClass(this.movement.type).class;
  }

}
