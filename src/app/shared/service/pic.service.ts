import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicService {
  private apiUrl = 'https://pic.marill.dev/predict';
  private apiKey = '7inzhNCSdjmfNHJVi5zsJU3weDTjQaR6p3ENkMXHVLPQYTAET9mkocDyXvJ3JDaSTKLTbMwgUKyPpJMenC7X';

  constructor(private http: HttpClient) { }

  predict(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.apiUrl, formData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Api-key ' + this.apiKey
      }
    });
  }
}
