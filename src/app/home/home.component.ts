import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../core/services/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  characters: any[] = [];
  loading: boolean = true;

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.apiCallService.getCharactersList().subscribe({
      next: (response) => {
        console.log('Characters loaded:', response.data.results);
        this.characters = response.data.results; // Asignar la respuesta al array de personajes
        this.loading = false; // Cambiar el estado de carga a false
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.loading = false; // Cambiar el estado de carga a false en caso de error
      },
    });
  }
}
