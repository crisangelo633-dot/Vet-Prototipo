import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../../shared/models';
import { PetsService } from '../../core/services/pets.service';

@Component({
  selector: 'app-my-pets',
  standalone: false,
  templateUrl: './my-pets.html',
  styleUrls: ['./my-pets.scss'],
})
export class MyPets {
  // Demo: ownerId fijo. Luego se reemplaza por auth o selección.
  private ownerId = 1;
  pets$!: Observable<Pet[]>;

  constructor(private pets: PetsService) {
    this.pets$ = this.pets.byOwner(this.ownerId);
  }
}
