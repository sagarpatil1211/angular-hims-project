import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent implements OnInit {
  formdata:any;
  titleData:any;
  userid = 0;

  constructor(private api:ApiService){

  }

  ngOnInit(): void {
    this.load();
    
  }

  load(){
    this.userid = 0;
    this.api.get('titles').subscribe((result:any)=>{ 
        this.titleData = result.data;
    })

    this.formdata = new FormGroup({
      name : new FormControl('',Validators.required)
    })
  }

  edit(id:any){
    this.userid = id;
    this.api.get('titles/' + id).subscribe((result:any)=>{
      this.formdata = new FormGroup({
        name : new FormControl(result.data.name,Validators.required)
      })
      
    })
  }

  submit(data:any){
    if(this.userid == 0){
      this.api.post('titles',data).subscribe((result:any)=>{
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
      this.api.put('titles/' + this.userid, data).subscribe((result:any)=>{
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
        this.api.delete('titles/' + id).subscribe((result:any)=>{
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
