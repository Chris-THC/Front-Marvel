import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../core/services/api-call.service';
import { ModalComponent } from '../modal/modal.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ModalComponent],
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
        this.characters = response.data.results.map((character: any) => {
          return {
            id: character.id,
            name: character.name,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          };
        });

        this.loading = false; // Cambiar el estado de carga a false
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.loading = false; // Cambiar el estado de carga a false en caso de error
      },
    });
  }
  
  isModalVisible = false;
  modalContent = 0;

  openModal(characterId: number) {
    this.modalContent = characterId;
    this.isModalVisible = true;
    console.log(this.isModalVisible);
    
  }
}
