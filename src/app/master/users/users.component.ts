import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  formdata:any;
  userData:any;
  userid = 0;

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.load();

  }

  load(){
    this.userid = 0;
    this.api.get('users').subscribe((result:any)=>{
      this.userData = result.data      
    })

    this.formdata = new FormGroup({
      name : new FormControl("",Validators.required),
      username : new FormControl("",Validators.required),
      password : new FormControl("",Validators.required),
    })
  }

  edit(id:any){
    this.userid = id;
    this.api.get('users/'+ id).subscribe((result:any)=>{
      this.formdata = new FormGroup({
        name : new FormControl(result.data.name,Validators.required),
        username : new FormControl(result.data.username,Validators.required),
        password : new FormControl(result.data.password,Validators.required),
      })
      
    })

  }

  submit(data:any){
    if(this.userid == 0){
      this.api.post('users',data).subscribe((result:any)=>{
        this.load(); 
        swal.fire({
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        }) 
      })
    }

    else{
      this.api.put('users/' + this.userid , data).subscribe((result:any)=>{
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Your data has been updated',
          showConfirmButton: false,
          timer: 1500
        }) 
      })
    }
  }

  delete(id:any){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('users/' + id).subscribe((result:any)=>{
          this.load();
        })
        swal.fire({
          icon: 'success',
          title: 'Your data has been deleted',
          showConfirmButton: false,
          timer: 1500
        }) 
      }
    })

  }



}
