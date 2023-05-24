import { Component, Input } from '@angular/core';
import { ICurrencyArrayData } from 'src/app/models/currency.model';
import { ModalService } from '../../services/modal.service';

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
  @Input() currentData: ICurrencyArrayData[];
  isModalOpen$ = this.modalService.isModalOpen$;
  constructor(private modalService: ModalService) {}

  onSelectFrom(): void {
    const currentCurrencyFrom = this.currentData.find(el => el[0] === this.selectedValueFrom);
    this.inputValueFrom = 1;

    if(currentCurrencyFrom) {
      this.currentCourseFrom = currentCurrencyFrom[1] 
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
    const currentCurrencyTo = this.currentData.find(el => el[0] === this.selectedValueTo);
    this.inputValueFrom = 1;
    if(currentCurrencyTo) {
      this.currentCourseTo = currentCurrencyTo[1] 
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