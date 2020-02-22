import { Component, OnInit, Input } from '@angular/core';
import { Movement } from '../movements.model';

@Component({
  selector: 'app-movement-item',
  templateUrl: './movement-item.component.html',
  styleUrls: ['./movement-item.component.scss'],
})
export class MovementItemComponent implements OnInit {
  @Input() movement: Movement;

  constructor() { }

  ngOnInit() {}

}
