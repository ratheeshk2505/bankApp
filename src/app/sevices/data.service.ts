import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


const options={
  withCredential:true,
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser=""
  acno=""
  // user:any={
  //   1000: {p_name:"Ram", ac_no:1000, uname:"ram", p_word1:"ram123", balance:5000, transaction:[]},
  //   1001: {p_name:"Ravi", ac_no:1001, uname:"ravi", p_word1:"ravi123", balance:2000, transaction:[]},
  //   1002: {p_name:"Raman", ac_no:1002, uname:"raman", p_word1:"raman123", balance:3000, transaction:[]},
  //   1003: {p_name:"Raju", ac_no:1003, uname:"raju", p_word1:"raju123", balance:2500, transaction:[]}
  // }

  constructor(private route:Router, private http:HttpClient) { 
   // this.getDetails() 
  }

  // saveToLocal(){
  //   if(this.user){
  //     localStorage.setItem("users", JSON.stringify(this.user))
  //   }
  //   if(this.currentUser){
  //     localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
  //   }
  //   if(this.acno){
  //     localStorage.setItem("acno",JSON.stringify(this.acno))
  //   }
  // }
  // getDetails(){
  //   if(localStorage.getItem("users")){
  //     this.user=JSON.parse(localStorage.getItem("users")||"")
  //   }
  //   if(localStorage.getItem("currentUser")){
  //     this.currentUser=JSON.parse(localStorage.getItem("currentUser")||"")
  //   }
  // }

  createAccount(p_name:any, ac_no:any, uname:any, p_word1:any, balance:any){
    
    const data={
      p_name, ac_no, uname, p_word1, balance
    }
    return this.http.post(environment.apiURL+'/createAcc', data)
    
    
    // let accDetail=this.user
    // if(ac_no in accDetail){
    //   return false
    // }
    // else{
    //   accDetail[ac_no]={p_name,ac_no,uname,p_word1,balance,transaction:[]}
    //   this.saveToLocal()
    //   console.log(accDetail);
    //   return true      
    // }
    
  }

  authenticate(ac_no:any,p_word1:any){

    const data={
      ac_no, p_word1
    }
    return this.http.post(environment.apiURL+'/authenticate', data, options)


    // let accDetail=this.user
    // if(ac_no in accDetail){
    //   if(p_word1 == accDetail[ac_no]["p_word1"]){
    //     this.currentUser=accDetail[ac_no]["p_name"]
    //     this.acno=ac_no
    //     this.saveToLocal()
    //   return true 
    // }
    // else{
    //     alert('Invalid Password')
    //     return false
    // }}
    // else{
    //   alert('Invalid User')
    //   return false
    // }
  }

  getTransactions(ac_no:any){
    const data={
      ac_no
    }
    return this.http.post(environment.apiURL+'/transactions', data, this.getOptions())
    // return this.user[ac_no].transaction
  }

  getOptions(){
    const token = localStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token){
      headers = headers.append("x-token",token)
      options.headers = headers
    }
    return options
  }

  deposit(ac_no:any, p_word1:any, amount:any){
    const data={
      ac_no, p_word1, amount
    }
    return this.http.post(environment.apiURL+'/deposit', data, this.getOptions())
    
    // var n_amount=parseInt(amount)
    // let accDetail=this.user
    // if(ac_no in accDetail){
    //   if(p_word1 == accDetail[ac_no]["p_word1"]){
    //     accDetail[ac_no]["balance"] += n_amount
    //     accDetail[ac_no]["transaction"].push({amount:n_amount, type:"CREDIT"})
    //     this.saveToLocal()
    //   return accDetail[ac_no]["balance"]
    // }
    // else{
    //     alert('Invalid Password')
    //     return false
    // }}
    // else{
    //   alert('Invalid User')
    //   return false
    // }
  }

  deleteAcc(ac_no:any){
    return this.http.delete(environment.apiURL+'/deleteAcc/'+ac_no, this.getOptions())
  }

  withdraw(ac_no:any, p_word1:any, amount:any){

    const data={
      ac_no, p_word1, amount
    }
    return this.http.post(environment.apiURL+'/withdraw', data, this.getOptions())

  //   var n_amount=parseInt(amount)
  //   let accDetail=this.user
  //   if(ac_no in accDetail){
  //     if(p_word1 == accDetail[ac_no]["p_word1"]){
  //       if(n_amount>accDetail[ac_no]["balance"]){
  //         alert("Insufficient balance")
  //         return false
  //       }
  //       else{
  //         accDetail[ac_no]["balance"] -= n_amount
  //         accDetail[ac_no]["transaction"].push({amount:n_amount, type:"DEBIT"})
  //         // console.log(accDetail[ac_no]["balance"])
  //         // this.saveToLocal()
  //         return accDetail[ac_no]["balance"]
  //       }
  //   }
  //   else{
  //       alert('Invalid Password')
  //       return false
  //   }}
  //   else{
  //     alert('Invalid User')
  //     return false
  //   }
  }
}
