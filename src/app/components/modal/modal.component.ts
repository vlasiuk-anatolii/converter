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
  currentCourseFrom: number;
  currentCourseTo: number;
  @Input() currentData: ICurrencyData[];
  isModalOpen$ = this.modalService.isModalOpen$;
  constructor(private modalService: ModalService) {}

  onSelectFrom(): void {
    const currentCurrencyFrom = this.currentData.find(el => el.cc === this.selectedValueFrom);
    this.inputValueFrom = 1;

    if(currentCurrencyFrom) {
      this.currentCourseFrom = currentCurrencyFrom.rate;
      this.inputValueTo = this.currentCourseTo / this.currentCourseFrom;
    }
  }

  onInputFrom(): void {
    if (this.inputValueFrom < 0) {
      this.inputValueFrom *= -1; 
    }

    if (this.selectedValueFrom && this.selectedValueTo) {
      this.inputValueTo = this.inputValueFrom * this.currentCourseTo / this.currentCourseFrom;;
    }
  }

  onSelectTo(): void {
    const currentCurrencyTo = this.currentData.find(el => el.cc === this.selectedValueTo);
    this.inputValueFrom = 1;
    
    if(currentCurrencyTo) {
      this.currentCourseTo = currentCurrencyTo.rate; 
      this.inputValueTo = this.currentCourseTo / this.currentCourseFrom;
    }
  }

  onInputTo(): void {
    if (this.inputValueTo < 0) {
      this.inputValueTo *= -1; 
    }
    
    if (this.selectedValueFrom && this.selectedValueTo) {
      this.inputValueFrom = this.inputValueTo * this.currentCourseFrom / this.currentCourseTo;
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}