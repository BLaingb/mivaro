import { Component, OnInit } from '@angular/core';
import { MovementsService } from './movements.service';
import { Observable } from 'rxjs';
import { Movement } from './movements.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss'],
})
export class MovementsPage implements OnInit {
  movements: Movement[];

  constructor(private movementsService: MovementsService) { }

  ngOnInit() {
    this.movementsService.getList().subscribe((movs) => {
      this.movements = movs;
    });
  }

}
