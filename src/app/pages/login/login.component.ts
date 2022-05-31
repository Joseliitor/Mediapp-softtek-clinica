import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;
  user: string;
  pass: string;


  constructor(  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    });
  }
  operar() {
    this.user = this.form.value['email'];
    this.pass = this.form.value['password'];
    alert('Hola ' + this.user + ' su pass es: ' + this.pass)

    console.log(this.user, this.pass);
  }

}
