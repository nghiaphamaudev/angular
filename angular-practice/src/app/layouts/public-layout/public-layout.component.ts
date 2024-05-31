import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
