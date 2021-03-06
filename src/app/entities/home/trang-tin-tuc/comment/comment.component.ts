import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @ViewChild ("formcomment",{static:false}) formcomment:NgForm
  @ViewChild ("formfix",{static:false}) formfix:NgForm
  tentintuc:any;
  info:any;
  mangsua:any;
  datacomment:any=[];
  newcomment:any=[];
  idxoa:any;
  idfix:any;
  constructor(private activaterouter:ActivatedRoute,
    private datadervice:DataService) { }

  ngOnInit() {
    this.layloaitintuc();
    this.getcoment();
    this.layinfodangnhap();
  }

  layinfodangnhap(){
    if(localStorage.getItem("KhachHang"))
    {
    this.info=JSON.parse(localStorage.getItem("KhachHang"));
    console.log(this.info)
    }
  }
  layloaitintuc(){
    this.activaterouter.queryParams.subscribe((params:any)=>{
      this.tentintuc=params.tentintuc;
      console.log(this.tentintuc);
  })
  }
  getcoment(){
    this.datadervice.get("http://5d81e3001c8ff70014ef40ba.mockapi.io/comment").subscribe((data=>{
      this.datacomment=data;
      this.newcomment=[];
      this.datacomment.map(item=>{
        if(item.name === this.tentintuc )
        {
          this.newcomment.push(item);
        }
      })
      
    }),(err)=>{
      console.log(err);
    })
  }
  postcoment(){
   
   
   if(this.formcomment.valid)
   {
    const comments={
      id:"",
      user:this.info.taiKhoan,
      name:this.tentintuc,
      comment:this.formcomment.value.comment
    }
    this.datadervice.post("http://5d81e3001c8ff70014ef40ba.mockapi.io/comment",comments).subscribe((data)=>{
      console.log(data);
     this.capnhat(data.id);
     this.formcomment.resetForm();

    },(err)=>{
      console.log(err)
    })
  }
   
    
  }
  capnhat(ID){
    const comments={
      id:ID,
      user:this.info.taiKhoan,
      name:this.tentintuc,
      comment:this.formcomment.value.comment
    }
    this.newcomment.push(comments);
    console.log(this.newcomment);
  }
  xoa(Id)
  {
    this.datadervice.delete(`http://5d81e3001c8ff70014ef40ba.mockapi.io/comment/${Id}`).subscribe((data)=>{
      console.log(data);
    },(err)=>(console.log(err)))
    
    this.idxoa=this.newcomment.findIndex((item)=>{
      return item.id===Id
    })
    console.log(Id);
    console.log(this.idxoa);
    this.newcomment.splice(this.idxoa,1);
    
  }
  sua(id){
    this.idfix=id;
    this.mangsua=this.newcomment.find((item)=>{
      return item.id===id
    })
    this.formfix.setValue({
      comment:this.mangsua.comment
    })
    
  }
  fixcoment(){
    const commentsfix={
      id:this.idfix,
      user:this.info.taiKhoan,
      name:this.tentintuc,
      comment:this.formfix.value.comment
    }
    this.datadervice.put(`http://5d81e3001c8ff70014ef40ba.mockapi.io/comment/${this.idfix}`,commentsfix).subscribe((data:any)=>{
      console.log(data);
      this.getcoment();
    },(err)=>{
      console.log(err)
    })
    
  

  }
}
