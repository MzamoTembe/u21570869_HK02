import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { Order } from '../../shared/Order';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { User } from '../../shared/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  orders:Order[] = []
  user: User = new User();
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getOrders()
    this.getUser()
  }

  getOrders(){
    this.service.getOrders().subscribe(result => {
      this.orders = result
    })
  }

  reorder(id: number){
    this.service.reorder(id)
  }

  getUser(){
    this.service.getUser().subscribe(result => {
      this.user = result
    })
  }

  // Modal Stuff
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.user.name, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  updateUser(user: User){
    this.service.updateUser(user)
  }
}
