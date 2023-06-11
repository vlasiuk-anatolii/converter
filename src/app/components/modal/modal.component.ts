import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ICurrencyData } from 'src/app/models/currency.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})

export class ModalComponent {
  selectedValueFrom: string;
  selectedValueTo: string;
  inputValueFrom: number = 1;
  inputValueTo: number =  1;
  inputValueAmountUAH: number;
  currentCourseFrom: number;
  currentCourseTo: number;
  inputValueUAH: string;
  @Input() currentData: ICurrencyData[];
  @Input() currentRateUSD: number;
  isModalOpen$ = this.modalService.isModalOpen$;
  constructor(private modalService: ModalService) {}

  onSelectFrom(): void {
    const currentCurrencyFrom = this.currentData.find(el => el.cc === this.selectedValueFrom);
    const currentCurrencyTo = this.currentData.find(el => el.cc === this.selectedValueTo);
    this.inputValueFrom = 1;
    this.inputValueUAH =`1$ = ${this.currentRateUSD}`;

    if(currentCurrencyFrom && currentCurrencyTo) {
      this.currentCourseFrom = currentCurrencyFrom.rate;
      this.currentCourseTo = currentCurrencyTo.rate;
      this.inputValueTo = this.inputValueFrom * this.currentCourseFrom / this.currentCourseTo;
      this.inputValueAmountUAH = this.inputValueFrom * this.currentCourseFrom;
    }
  }

  onInputFrom(): void {
    if (this.inputValueFrom < 0) {
      this.inputValueFrom *= -1; 
    }

    if (this.selectedValueFrom && this.selectedValueTo) {
      this.inputValueTo = this.inputValueFrom * this.currentCourseFrom / this.currentCourseTo;
      this.inputValueAmountUAH = this.inputValueFrom * this.currentCourseFrom;
    }
  }

  onSelectTo(): void {
    const currentCurrencyFrom = this.currentData.find(el => el.cc === this.selectedValueFrom);
    const currentCurrencyTo = this.currentData.find(el => el.cc === this.selectedValueTo);
    this.inputValueFrom = 1;
    this.inputValueUAH =`1$ = ${this.currentRateUSD}`;
    
    if(currentCurrencyFrom && currentCurrencyTo) {
      this.currentCourseTo = currentCurrencyTo.rate;
      this.currentCourseFrom = currentCurrencyFrom.rate;  
      this.inputValueFrom = this.inputValueTo * this.currentCourseTo / this.currentCourseFrom;
      this.inputValueAmountUAH = this.inputValueTo * this.currentCourseTo;
    }
  }

  onInputTo(): void {
    if (this.inputValueTo < 0) {
      this.inputValueTo *= -1; 
    }
    
    if (this.selectedValueFrom && this.selectedValueTo) {
      this.inputValueFrom = this.inputValueTo * this.currentCourseTo / this.currentCourseFrom;
      this.inputValueAmountUAH = this.inputValueTo * this.currentCourseTo;
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}