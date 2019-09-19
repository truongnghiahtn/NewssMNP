import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-news-item1',
  templateUrl: './news-item1.component.html',
  styleUrls: ['./news-item1.component.scss']
})
export class NewsItem1Component implements OnInit {
  @Input() tintuc;
  constructor(private datadervice:DataService,
    private router :Router
  ) { }

  ngOnInit() {
  }

  chitiet(){
    this.router.navigate(['/chi-tiet-tin-tuc',this.tintuc.id],{queryParams:{tentintuc:this.tintuc.name, Loaitin:this.tintuc.loaitin}})
    console.log(this.tintuc.id);
  }


  




}
