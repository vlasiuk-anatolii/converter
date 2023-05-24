import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { ICurrencyData } from './models/currency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'converter';
  arrData: ICurrencyData[];
  currentRateUSD: number;
  currentRateEUR: number;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService.getAll().subscribe((data) => {
      this.arrData = [...data];
      const dollar = this.arrData.find(el => el.cc === 'USD');
      const evro = this.arrData.find(el => el.cc === 'EUR');
      
      if(dollar) {
        this.currentRateUSD = dollar.rate;
      }

      if(evro) {
        this.currentRateEUR = evro.rate;
      }
    });
  }
}
