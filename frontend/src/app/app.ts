import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Pet { id: number; name: string; type: string; breed: string; age: string; emoji: string; color: string; description: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  pets: Pet[] = [];
  loading = true;
  error = '';
  selectedType = 'All pets';
  selectedPet: Pet | null = null;
  adopterName = '';
  adopterEmail = '';
  notice = '';
  submitting = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Pet[]>('http://127.0.0.1:3000/api/pets').subscribe({
      next: (pets) => { this.pets = pets; this.loading = false; },
      error: () => { this.error = 'We couldn’t load our pets. Please make sure the CareConnect API is running on port 3000.'; this.loading = false; },
    });
  }

  get filteredPets(): Pet[] {
    return this.selectedType === 'All pets' ? this.pets : this.pets.filter((pet) => pet.type === this.selectedType);
  }

  adopt(pet: Pet): void {
    this.selectedPet = pet;
    this.notice = '';
  }

  closeDialog(): void { this.selectedPet = null; }

  submitInterest(): void {
    if (!this.selectedPet) return;
    this.submitting = true;
    this.http.post<{ message: string }>('http://127.0.0.1:3000/api/adoptions', {
      petId: this.selectedPet.id, name: this.adopterName, email: this.adopterEmail,
    }).subscribe({
      next: (result) => { this.notice = result.message; this.submitting = false; this.adopterName = ''; this.adopterEmail = ''; this.selectedPet = null; },
      error: (err) => { this.notice = err.error?.message || 'Something went wrong. Please try again.'; this.submitting = false; },
    });
  }
}



