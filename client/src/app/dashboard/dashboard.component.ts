import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Contact, ContactsService } from '../contacts.service';
import { PhonePipe } from "../phone.pipe";
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    PhonePipe],
  providers: [
    ContactsService,
  ]
})
export class DashboardComponent {
  contacts: Contact[] = [];
  cols: number = 3;
  snackBarTimer: number = 4000;
  loading: boolean = true;

  constructor(private contactsService: ContactsService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadContacts();

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        if (state.breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        }
        else if (state.breakpoints[Breakpoints.TabletPortrait] ||
          state.breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 2;
        }
        else if (state.breakpoints[Breakpoints.WebPortrait] ||
          state.breakpoints[Breakpoints.WebLandscape] ||
          state.breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 3;
        }
      }
    });
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = this.sortContactsByLastNameFirstName(contacts);
      this.loading = false;
    });
  }

  deleteContact(contact: Contact): void {
    this.contactsService.deleteContact(contact.id).subscribe(() => {
      
      const index = this.contacts.indexOf(contact);
      if (index !== -1) {
        this.contacts.splice(index, 1);
        this.snackBar.open('Contact deleted', 'Dismiss', {
          duration: this.snackBarTimer
        });
      }
    });
  }

  openDialog(contact?: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '300px',
      data: contact || {}
    });

    dialogRef.afterClosed().subscribe((result: Contact) => {
      if (result) {
        if (contact) {
          // Edit mode: update the existing contact
          const index = this.contacts.indexOf(contact);
          if (index !== -1) {
            this.contacts[index] = result;
            this.snackBar.open('Contact edited', 'Dismiss', {
              duration: this.snackBarTimer
            });   
          }
        } else {
          this.contacts.push(result);
          this.sortContactsByLastNameFirstName(this.contacts);
          this.snackBar.open(`Contact added`, 'Dismiss', {
            duration: this.snackBarTimer
          });
        }
      }
    });
  }

  sortContactsByLastNameFirstName(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }
      return a.first_name.localeCompare(b.first_name);
    });
  }
}
