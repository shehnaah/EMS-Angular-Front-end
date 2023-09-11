import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// property
email:string=""
password:string=""
constructor(private api:ApiService,private loginRouter:Router){}
login(){
  if(this.email && this.password){
    // alert(`username:${this.username},password:${this.password}`)
    // compare username and password with admin details
    // we should get admin details from http://localhost:3000/users/1
    // for that we have to take an api call to http://localhost:3000/users/1
    this.api.adminDetails().subscribe({
      next:(result:any)=>{
        console.log(result);
        if(this.email==result.email && this.password==result.password){
          // save details in local storage
          localStorage.setItem("admin_name",result.name)
          localStorage.setItem("admin_pswd",result.password)
          alert("successful")
          this.loginRouter.navigateByUrl('home')

        }
        else{
          alert("invalid admin credential")
        }
      },
      error:(result:any)=>{
        console.log(result);
        alert("Error while fetching the data..please try after some time")
        
      }
    })
  }
  else{
    alert(`please fill the form completely`)
  }

}
}
