import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // switchTheme() {
  //   const bodyElement = document.querySelector('body');
  //   //bodyElement?.classList.remove('theme-light');
  //   bodyElement?.classList.add('deeppurple-amber');
  //   //bodyElement?.classList.add(themeName);
  // }
}
