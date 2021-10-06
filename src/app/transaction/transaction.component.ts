import { Component, OnInit } from '@angular/core';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions:any
  ac_no:any
  user = "Hello "+localStorage.getItem('currUser') +","
  constructor(private db:DataService) { 
    this.ac_no=JSON.parse(localStorage.getItem("acno")||"")
    this.db.getTransactions(this.ac_no)
    .subscribe((result:any)=>{
      this.transactions = result.transaction
    },((result:any)=>{
      alert(result.error.message)
    }))
    // console.log(this.transactions);
    
  }

  ngOnInit(): void {
  }

}
