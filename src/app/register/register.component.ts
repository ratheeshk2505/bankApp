import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm=this.fb.group({
    p_name:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    ac_no:['',[Validators.required, Validators.pattern('[0-9]*')]],
    uname:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    p_word1:['',[Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]],
    bal:['',[Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private route: Router, private db:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  createAccount(){
    var p_name=this.registerForm.value.p_name
    var ac_no=this.registerForm.value.ac_no
    var uname=this.registerForm.value.uname
    var pswrd=this.registerForm.value.p_word1
    var bal=this.registerForm.value.bal
    if(this.registerForm.valid){
      this.db.createAccount(p_name,ac_no,uname,pswrd,bal)
      .subscribe((result:any)=>{
        if (result){
          alert(result.message)
          this.route.navigateByUrl("")
        }
      }, (result:any)=>{
        alert(result.error.message)
      })
    }
    else{
      alert("Invalid Form Details")
    }
  }
}
