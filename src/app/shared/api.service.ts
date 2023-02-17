import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  baseurl = 'http://localhost:8081/';

  getheaders(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });
   return reqHeader
  }

  get(api:string){
  
    return this.http.get(this.baseurl + api, { headers: this.getheaders() })
  }
  post(api:string, data:any){

    return this.http.post(this.baseurl + api, data, { headers: this.getheaders() })
  }
  put(api:string, data:any){
    return this.http.put(this.baseurl + api, data , { headers: this.getheaders() })
  }
  delete(api:string){
    return this.http.delete(this.baseurl + api , { headers: this.getheaders() })
  }
}
