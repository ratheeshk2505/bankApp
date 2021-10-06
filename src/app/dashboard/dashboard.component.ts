import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any
  acno:any
  dLogin:Date = new Date()

  dash_depoForm=this.fb.group({
    d_ac_no:['',[Validators.required, Validators.pattern('[0-9]*')]],
    d_pswrd:['',[Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]],
    d_amount:['',[Validators.required, Validators.pattern('[0-9]*')]]
  })

  dash_withdrawForm=this.fb.group({
    w_ac_no:['',[Validators.required, Validators.pattern('[0-9]*')]],
    w_pswrd:['',[Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]],
    w_amount:['',[Validators.required, Validators.pattern('[0-9]*')]]
  })


  constructor(private db:DataService, private fb:FormBuilder, private route: Router) { 
    this.user = "Hello "+localStorage.getItem('currUser') +","
  }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Access Denied. Please Login")
      this.route.navigateByUrl("")
    }
  } 

  deposit(){
    var ac_no=this.dash_depoForm.value.d_ac_no
    var pswrd=this.dash_depoForm.value.d_pswrd
    var amount=this.dash_depoForm.value.d_amount
    // console.log(this.dash_depoForm);
    if(this.dash_depoForm.valid){
    this.db.deposit(ac_no,pswrd,amount)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
    }, (result:any)=>{
      alert(result.error.message)
    })
    
    }
    else{
        alert("Invalid Form Details")
      }
   
  }

  withdraw(){
    var ac_no=this.dash_withdrawForm.value.w_ac_no
    var pswrd=this.dash_withdrawForm.value.w_pswrd
    var amount=this.dash_withdrawForm.value.w_amount
    console.log(this.dash_withdrawForm.valid);
    if(this.dash_withdrawForm.valid){
    this.db.withdraw(ac_no,pswrd,amount)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
    }, (result:any)=>{
      alert(result.error.message)
    })
    }
    else{
      alert("Invalid Form Details")
      }
    }

  deleteAtParent(){
      this.acno=JSON.parse(localStorage.getItem("acno")||"")
    }

  onCancel(){
    this.acno=""
  }

  onDelete(event:any){
      this.db.deleteAcc(event)
      .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        localStorage.removeItem('token')
        this.route.navigateByUrl("")
      }
    }, (result:any)=>{
      alert(result.error.message)
    })
    }

  logout(){
    localStorage.removeItem("token")
    this.route.navigateByUrl("")
  }
}
