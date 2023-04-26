import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { Restaurant } from '../../shared/restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm!: string;
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
