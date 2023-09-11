import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../Modules/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url:string="http://localhost:3000"
  constructor(private http:HttpClient) { }
  // get admindetails
  adminDetails(){
  // api call to http://localhost:3000/users/1
 return this.http.get(`${this.base_url}/users/1`)
  }
  // getallusers
  getallusers(){
    return this.http.get(`${this.base_url}/users`)
  }
  // adduser
  adduser(user:UserSchema){
    // apicall to http://localhost:3000/users
    return this.http.post(`${this.base_url}/users`,user)
  }

  // getexistinguser
  getexistinguser(id:any){
        // apicall to http://localhost:3000/users/id
        return this.http.get(`${this.base_url}/users/${id}`)

  }
  // updateuser
  updateUser(id:any,data:UserSchema){
        // apicall to http://localhost:3000/users/id
        return this.http.put(`${this.base_url}/users/${id}`,data)

  }

  // deleteuser
  deleteuser(id:any){
            // apicall to http://localhost:3000/users/id
            return this.http.delete(`${this.base_url}/users/${id}`)

  }

  // updateadmin
  updateAdmin(adminBody:UserSchema){
      // api call to http://localhost:3000/users/1
 return this.http.put(`${this.base_url}/users/1`,adminBody)

  }
}
