import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-visor-citas',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './visorcitas.component.html',
  styleUrls: ['./visorcitas.component.css']
})
export class VisorCitasComponent implements OnInit {
  private http = inject(HttpClient);

  private githubUrl = 'https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json';

  quotes: any[] = [];
  currentQuote: any = null;
  loading: boolean = true;

  ngOnInit() {
    this.fetchQuotesFromGitHub();
  }

  fetchQuotesFromGitHub(): void {
    this.http.get<any[]>(this.githubUrl).subscribe({
      next: (data) => {
        console.log('PRIMERA CITA DEL JSON:', data[0]);
        this.quotes = data;
        this.loading = false;
        this.getRandomQuote();
      },
      error: (err) => {
        console.error(
          'Error al descargar las citas desde GitHub:',
          err
        );
        this.loading = false;
      }
    });
  }

  getRandomQuote(): void {
    if (this.quotes.length === 0) return;

    const index = Math.floor(Math.random() * this.quotes.length);

    this.currentQuote = {
      ...this.quotes[index],
      originalText: this.quotes[index].quoteText,
      translatedText: ''
    };
  }


}