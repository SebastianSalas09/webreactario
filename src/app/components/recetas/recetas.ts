import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recetas.html',
  styleUrls: ['./recetas.css']
})
export class RecetasComponent implements OnInit {
  recetas: any[] = [];

  constructor(private recetasService: RecetasService) {}

  ngOnInit() {
    this.recetasService.getRecetas().subscribe({
      next: (data) => {
        console.log('Recetas recibidas:', data);
        this.recetas = data;
      },
      error: (err) => console.error('Error al cargar recetas:', err)
    });
  }
}
