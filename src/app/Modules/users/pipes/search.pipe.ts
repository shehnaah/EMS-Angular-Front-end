import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers:any[],searchTerm:string,property:string): any[] {
    // array to store transformed values
    const result:any=[] 
    if(!allUsers || searchTerm==="" || property===""){
      return allUsers
    }
    allUsers.forEach((item:any)=>{
      if(item[property].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
