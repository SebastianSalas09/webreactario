import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Receta {
  id: number;
  nombre: string;
  ingredients: string;
  instructions: string;
  tiempo: string;
  dificultad: string;
  categoria: string;
  fechaCreacion: Date;
  favorito: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webreactario';

  // Propiedades para las recetas
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];

  // Nueva receta para el formulario
  nuevaReceta: Receta = {
    id: 0,
    nombre: '',
    ingredients: '',
    instructions: '',
    tiempo: '',
    dificultad: 'Fácil',
    categoria: '',
    fechaCreacion: new Date(),
    favorito: false
  };

  // Nuevas propiedades para filtros y vista
  vistaActiva: 'lista' | 'grid' = 'lista';
  soloFavoritas: boolean = false;
  ordenarPorNombre: boolean = false;
  categoriasUnicas: string[] = [];
  terminoBusqueda: string = '';

  ngOnInit() {
    // Cargar recetas del localStorage si existen
    const recetasGuardadas = localStorage.getItem('recetas');
    if (recetasGuardadas) {
      this.recetas = JSON.parse(recetasGuardadas);
    }
    this.actualizarCategorias();
    this.filtrarRecetas();
  }

  // Método para agregar receta
  agregarReceta() {
    if (this.nuevaReceta.nombre.trim()) {
      this.nuevaReceta.id = Date.now();
      this.nuevaReceta.fechaCreacion = new Date();
      this.recetas.push({...this.nuevaReceta});
      
      // Guardar en localStorage y actualizar
      this.guardarRecetas();
      this.actualizarCategorias();
      this.filtrarRecetas();
      
      // Resetear el formulario
      this.limpiarFormulario();
    }
  }

  // Método para eliminar receta
  eliminarReceta(id: number) {
    this.recetas = this.recetas.filter(receta => receta.id !== id);
    this.guardarRecetas();
    this.actualizarCategorias();
    this.filtrarRecetas();
  }

  // Método para toggle favorito
  toggleFavorito(receta: Receta) {
    receta.favorito = !receta.favorito;
    this.guardarRecetas();
    this.filtrarRecetas();
  }

  // MÉTODOS NUEVOS PARA FILTROS Y VISTA

  cambiarVista(vista: 'lista' | 'grid') {
    this.vistaActiva = vista;
  }

  contarFavoritas(): number {
    return this.recetas.filter(r => r.favorito).length;
  }

  filtrarPorCategoria(event: any) {
    const categoria = event.target.value;
    this.filtrarRecetas(categoria);
  }

  filtrarPorDificultad(event: any) {
    const dificultad = event.target.value;
    this.filtrarRecetas('', dificultad);
  }

  toggleSoloFavoritas(event: any) {
    this.soloFavoritas = event.target.checked;
    this.filtrarRecetas();
  }

  toggleOrdenarNombre(event: any) {
    this.ordenarPorNombre = event.target.checked;
    this.filtrarRecetas();
  }

  actualizarCategorias() {
    const categorias = this.recetas.map(r => r.categoria).filter(c => c && c.trim() !== '');
    this.categoriasUnicas = [...new Set(categorias)];
  }

  filtrarRecetas(categoria: string = '', dificultad: string = '') {
    let filtradas = [...this.recetas];

    // Filtro por término de búsqueda
    if (this.terminoBusqueda) {
      filtradas = filtradas.filter(receta =>
        receta.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        (receta.categoria && receta.categoria.toLowerCase().includes(this.terminoBusqueda.toLowerCase())) ||
        receta.ingredients.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }

    // Filtro por categoría
    if (categoria) {
      filtradas = filtradas.filter(receta => receta.categoria === categoria);
    }

    // Filtro por dificultad
    if (dificultad) {
      filtradas = filtradas.filter(receta => receta.dificultad === dificultad);
    }

    // Filtro por favoritas
    if (this.soloFavoritas) {
      filtradas = filtradas.filter(receta => receta.favorito);
    }

    // Ordenar por nombre
    if (this.ordenarPorNombre) {
      filtradas = filtradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    this.recetasFiltradas = filtradas;
  }

  onBuscarChange(event: any) {
    this.terminoBusqueda = event.target.value;
    this.filtrarRecetas();
  }

  limpiarFormulario() {
    this.nuevaReceta = {
      id: 0,
      nombre: '',
      ingredients: '',
      instructions: '',
      tiempo: '',
      dificultad: 'Fácil',
      categoria: '',
      fechaCreacion: new Date(),
      favorito: false
    };
  }

  editarReceta(receta: Receta) {
    // Para editar, copiamos los datos de la receta al formulario
    this.nuevaReceta = { ...receta };
    
    // Y eliminamos la receta original
    this.eliminarReceta(receta.id);
  }

  verDetalles(receta: Receta) {
    // Aquí puedes implementar un modal o vista de detalles
    alert(`Detalles de: ${receta.nombre}\n\nIngredientes: ${receta.ingredients}\n\nInstrucciones: ${receta.instructions}`);
  }

  // Método para guardar en localStorage
  private guardarRecetas() {
    localStorage.setItem('recetas', JSON.stringify(this.recetas));
  }
}