import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { CartItem } from '../../shared/cart';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { User } from '../../shared/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  instuction!: string;
  items:CartItem[] = []
  user: User = new User();

  constructor(private service:ServiceService) { }

  ngOnInit() {
    this.getCart()
    this.getUser()
  }

  getCart(){
    this.service.getCart().subscribe(result => {
      this.items = result
    })
  }

  placeOrder(instuction: string){
    this.service.placeOrder(instuction)
  }

  // Modal Stuff
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {    
    }
  }

  getUser(){
    this.service.getUser().subscribe(result => {
      this.user = result
    })
  }

  updateUser(user: User){
    this.service.updateUser(user)
  }
}
