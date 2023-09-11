import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {UserSchema} from '../users.model'
import jspdf from 'jspdf'
import autotable from 'jspdf-autotable'
import { EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  allUsers:UserSchema[]=[]
  searchKey:string=""
  page:number=1;
  count:number=0
  tableSize:number=5;

constructor(private api:ApiService){}
// when userslistcomponent page is open call getuserslist()
ngOnInit(): void {
    this.getUserList()
    this.sortById()
}
getUserList(){
  this.api.getallusers().subscribe({
    next:(result:any)=>{
      console.log(result);
      this.allUsers=result
      this.count=this.allUsers.length
    },
    error:(result:any)=>{
      console.log(result);
      alert("Error while fetching data....")
      
    }
  })
}

deleteuser(id:any){
  this.api.deleteuser(id).subscribe({
next:(res:any)=>{
  console.log("delete successfully");
  this.getUserList()
  
},
error:(err:any)=>{
  console.log(err);
  alert("cannot perform action now..please try after somw times!!!")

}
  })
}

sortById(){
  this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  console.log(this.allUsers);
  
}

sortByName(){
this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
  // this.allUsers.sort((a:any,b:any)=>{
  //   let fa = a.name.toLowerCase()
  //   let fb = b.name.toLowerCase()
  //   if(fa<fb){
  //     return -1
  //   }
  //   if(fa>fb){
  //     return 1
  //   }
  //   return 0
  // })

}

onTableDataChange(event:any){
  this.page=event;
}

generatePDF(){
  let pdf =  new jspdf()
  let head = [['User Id','Username','Email','Status']]
  let body:any = []
  this.allUsers.forEach((item:any)=>{
    body.push([item.id,item.name,item.email,item.active])
  })
  pdf.setFontSize(16)
  pdf.text("All Employee List",10,10)
  autotable(pdf,{head,body})
  pdf.output('dataurlnewwindow')
  pdf.save("allusers.pdf")
}
}