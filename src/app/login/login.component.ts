import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  testHead="Login to Proceed"
  username="Account Number"
  
  loginForm=this.fb.group({
    ac_no:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswrd:['', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]]
  })

  constructor(private route: Router, private db:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

      // two way binding
      // $event reference binding
  authenticate(){
    var ac_no=this.loginForm.value.ac_no
    var pswrd=this.loginForm.value.pswrd
    if(this.loginForm.valid){
    this.db.authenticate(ac_no,pswrd)
    .subscribe((result:any)=>{
      if(result){
        localStorage.setItem("token",result.token)
        localStorage.setItem("currUser",result.currUser)
        localStorage.setItem("acno",ac_no)
        alert(result.message)
        this.route.navigateByUrl("dashboard")
      }
    }, (result:any)=>{
        alert(result.error.message)
      }
    )
  }
  else{
    alert("Invalid Form Details")
  }

        // $event reference binding
  // accNum(event:any){
  //   this.acc_no=event.target.value;
  // }
  // pwrd1(event:any){
  //   this.pwrd=event.target.value;
  // }

      // template binding
  // authenticate(ac:any,pw:any){
  //   var acc_no=ac.value
  //   var pwrd=pw.value
  //   let accDetails=this.user;
  //   if(acc_no in accDetails){
  //     if(pwrd == accDetails[acc_no]["p_word"]){
  //       alert('Login Success')
  //     }
  //     else{
  //       alert('Invalid Password')
  //     }
  //   }
  //   else{
  //     alert('Invalid User')
  //   }
  // }
  }
}
