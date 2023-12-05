import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-td-form',
  templateUrl: './td-form.component.html',
  styleUrls: ['./td-form.component.scss'],
})
export class TdFormComponent implements OnInit {
  userForm = {
    defUserName: '',
    email: '',
    question: '',
  };

  genders = [
    {
      label: 'uomo',
      value: 'uomo',
    },
    {
      label: 'donna',
      value: 'donna',
    },
  ];

  risposta = '';

  user: any = {
    username: '',
    email: '',
    secret: '',
    risposta: '',
    genere: '',
  };

  @ViewChild('form', { static: true }) form!: NgForm;
  constructor() {}

  ngOnInit(): void {
    this.form.statusChanges?.subscribe((status) => {
      console.log('status del form: ', status);
    });
  }

  createUser() {
    this.form.form.patchValue({
      userInfo: {
        email: 'pippo@pippo.com',
        username: 'pippo',
      },
    });
  }
  submit() {
    console.log('Form inviato: ', this.form);
    this.user.username = this.form.value.userInfo.username;
    this.user.email = this.form.value.userInfo.email;
    this.user.secret = this.form.value.userInfo.secret;
    this.user.risposta = this.form.value.userInfo.risposta;
    this.user.genere = this.form.value.userInfo.genere;
  }
}
