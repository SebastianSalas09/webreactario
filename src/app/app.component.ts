import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Receta {
  nombre: string;
  ingredientes: string;
  instrucciones: string;
  tiempo: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webreactario';
  
  recetas: Receta[] = [
    {
      nombre: 'Ensalada César',
      ingredientes: 'Lechuga, pollo, crutones, queso parmesano, aderezo césar',
      instrucciones: '1. Lavar la lechuga\n2. Cocinar el pollo\n3. Mezclar todos los ingredientes\n4. Agregar aderezo',
      tiempo: '20 minutos'
    }
  ];

  nuevaReceta: Receta = {
    nombre: '',
    ingredientes: '',
    instrucciones: '',
    tiempo: ''
  };

  agregarReceta() {
    if (this.nuevaReceta.nombre && this.nuevaReceta.ingredientes && this.nuevaReceta.instrucciones) {
      this.recetas.push({...this.nuevaReceta});
      this.nuevaReceta = {
        nombre: '',
        ingredientes: '',
        instrucciones: '',
        tiempo: ''
      };
    }
  }

  eliminarReceta(index: number) {
    this.recetas.splice(index, 1);
  }
}