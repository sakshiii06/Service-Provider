import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styles: [],
})
export class AddProvidersComponent implements OnInit {
  submitted = false;
  emailError = false;
  emailErrorMsg = 'Invalid email. Try again or contact us.';
  providers: ProviderClass[] = [];
  provider = new ProviderClass();
  providersForm: FormGroup;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.buildFormControls();
    this.loadData();
  }

  // Method to easily access form controls
  get f() {
    return this.providersForm.controls;
  }

  // Handle form submission
  handleSubmit() {
    console.log(this.providersForm.value);
    this.buildProvider();
    if (!this.isInvalidEmail()) {
      this.providerService.addProviders(this.provider).subscribe(
        (data) => {
          this.submitted = true;
          this.emailError = false;
        },
        (error) => console.log(error)
      );
    }
  }

  // GET all data from the database
  loadData() {
    this.providerService.getProviders().subscribe(
      (data) => {
        this.providers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Check for duplicate emails
  isInvalidEmail() {
    let email = this.providersForm.get('email')?.value;
    if (this.providers.some((el) => el.company?.email === email)) {
      this.emailError = true;
      return true;
    } else {
      return false;
    }
  }

  // Generate a new ID
  getNewId() {
    let newId: number;
    while (true) {
      newId = Math.floor(Math.random() * 10000) + 99999;
      if (this.providers.findIndex((el) => el.id === newId) === -1) {
        return newId;
      }
    }
  }

  // Build new provider object
  buildProvider() {
    let p = this.providersForm.value;
    this.provider.id = this.getNewId();
    this.provider.firstname = p.firstname;
    this.provider.lastname = p.lastname;
    this.provider.position = p.position;
    this.provider.company = {
      company_name: p.company_name,
      address: p.address,
      address2: p.address2,
      city: p.city,
      state: p.state,
      postal_code: p.postal_code,
      phone: p.phone,
      email: p.email,
      description: p.description,
      tagline: p.tagline,
    };
  }

  // Build form controls
  buildFormControls() {
    this.providersForm = new FormGroup({
      firstname: new FormControl('Christian', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('Mar'),
      position: new FormControl(),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[2-9]{3}-[0-9]{3}-[0-9]{4}$'),
      ]),
      company_name: new FormControl(),
      address: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      postal_code: new FormControl(),
      description: new FormControl(),
      tagline: new FormControl(),
    });
  }
}
