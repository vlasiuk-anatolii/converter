import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isMenuOpen: boolean = false;
  constructor(private modalService: ModalService) {}
  
  openModal() {
    this.modalService.openModal();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}