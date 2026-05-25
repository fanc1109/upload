import { Component } from '@angular/core';
import { GaleriaComponent } from './galeria/galeria'; // Importa a galeria

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GaleriaComponent], // Adiciona a galeria aqui para liberar a tag no HTML
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'frontend';
}