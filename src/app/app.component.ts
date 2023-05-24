import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { ICurrencyArrayData, ICurrencyData } from './models/currency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'converter';
  dataObject: ICurrencyData;
  arrData: ICurrencyArrayData[];

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService.getAll().subscribe((obj) => {
      this.dataObject = { ...obj };
      this.arrData = this.arrData = Object.entries(this.dataObject.data);
    })
  }
}
