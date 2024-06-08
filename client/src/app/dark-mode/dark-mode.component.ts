import { Component, Renderer2 } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [
    MatIcon,
    MatSlideToggle
  ],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss'
})
export class DarkModeComponent {  
  isDarkMode: boolean | undefined = undefined;

  constructor(private renderer: Renderer2) {
    this.setDarkMode(this.getDarkModePreference());
  }

  onToggleChange(event: MatSlideToggleChange) {
    this.setDarkMode(!event.checked);
  }

  setDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('isDarkMode', 'true')
      this.isDarkMode = true;
    }
    else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('isDarkMode', 'false')
      this.isDarkMode = false;
    }
  }

  // get darkmode pref from local storage if available else use media settings
  getDarkModePreference(): boolean {
    let prefLocalStorage: string | null = localStorage.getItem('isDarkMode');
    let prefMedia: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefLocalStorage === null) {
      return prefMedia;
    }
    else {
      return prefLocalStorage === 'true';
    }
  }
}
