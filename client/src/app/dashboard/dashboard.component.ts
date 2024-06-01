import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Contact, ContactsService } from '../contacts.service';
import { PhonePipe } from "../phone.pipe";
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  providers: [ContactsService],
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    PhonePipe
  ]
})
export class DashboardComponent {
  contacts: Contact[] = [];
  cols: number = 3;

  constructor(private contactsService: ContactsService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadContacts();

    console.log(Breakpoints.Handset);
    console.log(Breakpoints.Tablet);
    console.log(Breakpoints.Web);

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log(state);
        if (state.breakpoints[Breakpoints.HandsetPortrait]) {
          console.log('Small breakpoint matched');
          this.cols = 1;
        }
        else if (state.breakpoints[Breakpoints.TabletPortrait] ||
          state.breakpoints[Breakpoints.HandsetLandscape]) {
          console.log('Medium breakpoint matched');
          this.cols = 2;
        }
        else if (state.breakpoints[Breakpoints.WebPortrait] ||
          state.breakpoints[Breakpoints.WebLandscape] ||
          state.breakpoints[Breakpoints.TabletLandscape]) {
          console.log('Large breakpoint matched');
          this.cols = 3;
        }
      }
    });
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  saveContact(contact: Contact) {
    this.contactsService.createContact(contact).subscribe((result: Contact) => {
      return result;
    });
  }

  openDialog(contact?: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '300px',
      data: contact || {} // Pass the contact data if editing, otherwise pass an empty object
    });

    dialogRef.afterClosed().subscribe((result: Contact) => {
      if (result) {
        if (contact) {
          // Edit mode: update the existing contact
          const index = this.contacts.indexOf(contact);
          if (index !== -1) {
            this.contacts[index] = result;
          }
        } else {
          // Create mode: add a new contact
          this.saveContact(result);
          this.contacts.push(result);
        }
        console.log('Contact added or edited:', result);
      }
    });
  }
}
