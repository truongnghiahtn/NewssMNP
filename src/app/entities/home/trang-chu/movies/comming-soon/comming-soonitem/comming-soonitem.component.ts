import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comming-soonitem',
  templateUrl: './comming-soonitem.component.html',
  styleUrls: ['./comming-soonitem.component.scss']
})
export class CommingSoonitemComponent implements OnInit {
  @Input() phim;
  status: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
