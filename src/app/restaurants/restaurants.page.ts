import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { Restaurant } from '../../shared/restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})

export class RestaurantsPage implements OnInit {
  restaurants:Restaurant[] = []

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getRestaurants()
  }

  getRestaurants(){
    this.service.getRestaurants().subscribe(result => {
      this.restaurants = result
    })
  }

  updateCart(restaurant: Restaurant){
    this.service.updateCart(restaurant)
  }
}
