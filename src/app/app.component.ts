import { Component } from '@angular/core';
import { RecetasComponent } from './components/recetas/recetas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecetasComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
