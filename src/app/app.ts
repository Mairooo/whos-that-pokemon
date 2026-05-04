import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './shared/component/camera/camera';
import { PicService } from './shared/service/pic.service';
import { Prediction } from './shared/interface/prediction';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CameraComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'whos-that-pokemon';

  predictions = signal<Prediction[]>([]);
  isLoading = signal(false);

  constructor(
    private predictionService: PicService
  ) {}

  getPredictions(file: File): void {
    this.isLoading.set(true);
    this.predictionService.predict(file).subscribe({
      next: (response: Prediction[]) => {
        console.log('[PIC] response:', response);
        this.predictions.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('[PIC] error:', error);
      }
    });
  }
}
