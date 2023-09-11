import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  user:UserSchema={}
  originalUser:UserSchema={}
  constructor(private route:ActivatedRoute,private api:ApiService){

  }
  ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    const {id}=res
    console.log(id);
    this.existinguser(id)
  })
  }

  existinguser(id:any){
    this.api.getexistinguser(id).subscribe({
      next:(res:UserSchema)=>{
        console.log(res);
        this.user=res
      },
      error:(err:any)=>{
        console.log(err);
        alert("cannot perform the action now..please try after some time")
      }
    })

  }

  updateUser(){
    this.api.updateUser(this.user.id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User details updated succesfully")
        
      },
      error:(err:any)=>{
        console.log(err);
        alert("cannot perform action now..please try after somw times!!!")
        
      }
    })
  }

  cancelUpdate(userId:any){
    this.existinguser(userId)
  }
}
