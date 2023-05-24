import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalService {
  private isModalOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isModalOpen$ = this.isModalOpenSubject.asObservable();

  openModal() {
    this.isModalOpenSubject.next(true);
  }

  closeModal() {
    this.isModalOpenSubject.next(false);
  }
}
