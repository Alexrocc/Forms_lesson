import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  form!: FormGroup;
  genders = ['uomo', 'donna'];
  // validatore custom
  userProibiti = ['Pippo', 'Pluto'];

  constructor(private fb: FormBuilder) {}

  validUsername = (formC: FormControl) => {
    if (this.userProibiti.includes(formC.value)) {
      return { usernameProibito: true };
    } else {
      return null;
    }
  };

  // Creazione dati dal form con oggetto nested
  ngOnInit(): void {
    this.form = this.fb.group({
      userInfo: this.fb.group({
        username: this.fb.control(null, [
          Validators.required,
          this.validUsername,
        ]),
        email: this.fb.control(null, [Validators.required, Validators.email]),
      }),
      gender: this.fb.control('uomo'),
      sports: this.fb.array([]),
    });
  }

  // Intercetta gli errori del form e li manda solo se esistono
  getErrorsC(name: string, error: string) {
    return this.form.get(name)?.errors![error];
  }

  getFormC(name: string) {
    return this.form.get(name);
  }

  getSportsC() {
    return (this.form.get('sports') as FormArray).controls;
  }

  addSports() {
    const control = this.fb.control(null);
    (this.form.get('sports') as FormArray).push(control);
    console.log(this.getSportsC());
  }

  submit() {
    console.log(this.form);
    console.log('form correttamente inviato');
    this.form.reset();
  }
}
