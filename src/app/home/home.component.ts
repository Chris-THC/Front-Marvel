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
  characterInfo: any;
  loading: boolean = true;
  series: { id: string; name: string }[] = [];

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.apiCallService.getCharactersList().subscribe({
      next: (response) => {
        this.characters = response.data.results.map((character: any) => {
          return {
            id: character.id,
            name: character.name,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          };
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.loading = false;
      },
    });
  }

  // loadCharactersById(characterId: number): void {
  //   this.apiCallService.getCharacterById(characterId).subscribe({
  //     next: (response) => {
  //       const infoCharacter = response.data.results[0];

  //       this.characterInfo = {
  //         id: infoCharacter.id,
  //         name: infoCharacter.name,
  //         description: infoCharacter.description,
  //         thumbnail: `${infoCharacter.thumbnail.path}.${infoCharacter.thumbnail.extension}`,
  //         series: infoCharacter.series.items,
  //       };

  //       this.isModalVisible = true;
  //     },
  //     error: (error) => {
  //       console.error('Error loading character:', error);
  //     },
  //   });
  // }

  loadCharactersById(characterId: number): void {
    this.apiCallService.getCharacterById(characterId).subscribe({
      next: (response) => {
        const infoCharacter = response.data.results[0];
        this.characterInfo = {
          id: infoCharacter.id,
          name: infoCharacter.name,
          description: infoCharacter.description,
          thumbnail: `${infoCharacter.thumbnail.path}.${infoCharacter.thumbnail.extension}`,
          series: infoCharacter.series.items.map((serie: any) => ({
            id: serie.resourceURI.split('/').pop(),
            name: serie.name,
          })),
          comics: infoCharacter.comics.items.map((comic: any) => ({
            name: comic.name,
          })),
        };

        // Enviar las series al modal
        this.series = this.characterInfo.series;

        this.isModalVisible = true;
      },
      error: (error) => {
        console.error('Error loading character:', error);
      },
    });
  }

  isModalVisible = false;
  characterId = 0;
  character: any;

  openModal(characterId: number) {
    this.characterId = characterId;
    this.loadCharactersById(characterId);
    this.isModalVisible = true;
  }
}
