import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contact, ContactsService } from '../contacts.service';
import { catchError, ignoreElements, of, throwError } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ContactsService,
  ]
})
export class ContactFormComponent {

  contactForm: FormGroup;
  isEditMode: boolean;
  errorMessage: string | null = null;

  constructor(
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {
    this.isEditMode = contact.id !== undefined;
    this.contactForm = new FormGroup({
      id: new FormControl(contact.id),
      first_name: new FormControl(contact?.first_name || '', [Validators.required]),
      last_name: new FormControl(contact?.last_name || '', [Validators.required]),
      email: new FormControl(contact?.email || '', [Validators.required, Validators.email]),
      phone: new FormControl(contact?.phone || '', [Validators.required, Validators.pattern(/^\d{10}$/)])
    });
  }
  onSubmit() {
    if (!this.contactForm.valid) {
      throwError(() => new Error("Internal error, form is invalid.")); // need to throw error here
    }
    if (this.isEditMode) {
      this.updateContact(this.contactForm.value);
    }
    else {
      this.createContact(this.contactForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  createContact(contact: Contact) {
    this.errorMessage = null;
    this.contactsService.createContact(contact)
      .pipe(
        catchError((e) => {
          this.errorMessage = e.error.detail;
          return of(e).pipe(ignoreElements());
        }),
      )
      .subscribe(
        (result: string) => {
          contact.id = result;
          this.dialogRef.close(contact);
        }
      );
  }

  updateContact(contact: Contact) {
    this.errorMessage = null;
    this.contactsService.updateContact(contact)
      .pipe(
        catchError((e) => {
          this.errorMessage = e.error.detail;
          return of(e).pipe(ignoreElements())
        }),
      )
      .subscribe(
        () => { this.dialogRef.close(contact); }
      );
  }
}
