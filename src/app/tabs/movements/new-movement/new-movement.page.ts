import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.page.html',
  styleUrls: ['./new-movement.page.scss'],
})
export class NewMovementPage implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  onConfirm() {}

}
