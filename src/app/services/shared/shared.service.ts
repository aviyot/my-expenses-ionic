import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public modalController: ModalController) { }

  closeModal(data){
    this.modalController.dismiss(data);
  }
}
