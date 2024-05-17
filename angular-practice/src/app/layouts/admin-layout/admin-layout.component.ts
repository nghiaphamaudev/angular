import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { HeaderComponent } from '../../component/header/header.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NavbarComponent,HeaderComponent,FooterComponent,RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
