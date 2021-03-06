import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-trang-dang-ky',
  templateUrl: './trang-dang-ky.component.html',
  styleUrls: ['./trang-dang-ky.component.scss']
})
export class TrangDangKyComponent implements OnInit {

  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  constructor(private dataService: DataService) {

  }
  ngOnInit() {
  }

  _handleOnSubmit(user) {
    const uri = "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy";
    this.dataService.post(uri,
      {
        ...user,
        maNhom: 'GP01',
        maLoaiNguoiDung: 'KhachHang'
      }
    ).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }
  @HostListener("window:beforeunload", ["$event"])
  canDeactivate($event): boolean {
    return this.formSignUp.submitted || !this.formSignUp.dirty;
  }
}
