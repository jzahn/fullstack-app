import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contact, ContactsService } from '../contacts.service';
import { catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  providers: [ContactsService],
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  contactForm: FormGroup;
  isEditMode: boolean;
  errorMessage: string | null = null;

  constructor(
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {
    this.isEditMode = !!data;

    this.contactForm = new FormGroup({
      first_name: new FormControl(data?.first_name || '', [Validators.required]),
      last_name: new FormControl(data?.last_name || '', [Validators.required]),
      email: new FormControl(data?.email || '', [Validators.required, Validators.email]),
      phone: new FormControl(data?.phone || '', [Validators.required, Validators.pattern(/^\d{10}$/)])
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      this.saveContact(this.contactForm.value);
      console.log(this.errorMessage);
      // if (this.errorMessage == null) {
      //   this.dialogRef.close(this.contactForm.value);
      // }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveContact(contact: Contact) {
    this.errorMessage = null;
    this.contactsService.createContact(contact)
      .pipe(
        catchError((e) => of(this.errorMessage = e.error.detail))
      )
      .subscribe(
        (result: string | Contact) => {return result;}
      );
  }
}
