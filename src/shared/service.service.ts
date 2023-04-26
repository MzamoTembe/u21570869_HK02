import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from './restaurant';
import { CartItem } from './cart';
import { Order } from './Order';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { 
    if(!localStorage.getItem('restaurants')) {
      let restaurants = [
        {
          id: 1,
          name: "Mama Joyce's",
          dishtype: "South Africa",
          distance: "10 kms",
          price: 20,
          rating: 4,
          image: "https://www.unileverfoodsolutions.co.za/dam/global-ufs/mcos/SOUTH-AFRICA/calcmenu/recipes/ZA-recipes/general/mama-joyces-magwinya-(vetkoek)/main-header.jpg"
        },
        {
          id: 2,
          name: "Delmonico's",
          dishtype: "English",
          distance: "15 kms",
          price: 100,
          rating: 3,
          image: "https://images.unsplash.com/photo-1503442947665-4c7bb47d5daf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80"
        },
        {
          id: 3,
          name: "The Curry Den",
          dishtype: "Indian",
          distance: "7 kms",
          price: 120,
          rating: 5,
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1971&q=80"
        },
        {
          id: 4,
          name: "La Piazza",
          dishtype: "Italian",
          distance: "25 kms",
          price: 150,
          rating: 4,
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        }
      ]  
      localStorage.setItem('restaurants', JSON.stringify(restaurants)) 
    }
  }

  getRestaurants(): Observable<any[]> {
    // Returns restaurants or an empty array (if the restaurants is not found in localStorage)
    return of(JSON.parse(localStorage.getItem('restaurants') || '[]'));
  }

  getUser(): Observable<any> {
    // Get user from localStorage
    const userString = localStorage.getItem('user');
    var user: User = new User();
    // Returns user or a new user (if the user is not found in localStorage)
    if(userString){
      user = JSON.parse(userString)[0];
    }else{
      user = {id:1, name:"John", surname:"Wick", email:"awes@gmail.com", number:27794912289, address1:"51 Lynwood Rd", address2:"Brooklyn", city:"Hatfield", province:"Gauteng", postcode:4399};
      localStorage.setItem('user', JSON.stringify([user]));
    }
    return of(user)
  }

  updateUser(user: User): void{
    // Get relevant user
    var myuser: User = new User();
    this.getUser().subscribe(result => {myuser = result})
    // Update user
    if (myuser && myuser.id === user.id) {
      localStorage.setItem('user', JSON.stringify([user]));
    }
  }

  getCart(): Observable<any[]>{
    // Returns cart or an empty array (if the cart is not found in localStorage)
    return of(JSON.parse(localStorage.getItem('cart') || '[]'));
  }

  updateCart(restaurant: Restaurant): void {
    // Retrieve relevant data from local storage
    var cart: CartItem[] = [];
    this.getCart().subscribe(result => {cart = result})
    const cartItem = cart.findIndex(item => item.restaurant.id === restaurant.id);
    // If a restaurant item is inside the cart then increment the total and quantity
    if (cartItem !== -1) {
      cart[cartItem].itemscount++;
      cart[cartItem].total = cart[cartItem].itemscount * cart[cartItem].restaurant.price;
    }
    // Or just add the restaurant to the cart
    else {
      cart.push({
        id: 0,
        restaurant,
        itemscount: 1,
        total: restaurant.price
      });
    }
    // Put the cart back in the local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getOrders(): Observable<any[]>{
    // Returns orders or an empty array (if the orders are not found in localStorage)
    return of(JSON.parse(localStorage.getItem('orders') || '[]'));
  }

  placeOrder(instruction: string): void {
    // Retrive relevant data from local storage
    var cart: CartItem[] = []
    this.getCart().subscribe(result => {cart = result})
    var orders: Order[] = []
    this.getOrders().subscribe(result => {orders = result})
    // Get relevant user
    var myuser: User = new User();
    this.getUser().subscribe(result => {myuser = result})
    // Create order 
    const order: Order = {
      id: 0,
      cartitem: cart,
      instructions: instruction,
      date: new Date().toLocaleDateString(),
      user: myuser,
      deliveryfee: 50,
      total: cart.reduce((acc, item) => acc + item.total, 0) + 50,
    };
    // Push order to orders array and put order array + user back to local storage
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  // If i did the place order function properly then this would not be here actually
  reorder(id: number): void{
    // Retrive specific order from orders array
    var orders:Order[]  = JSON.parse(localStorage.getItem('orders')!)
    var order:any = orders.find(order => order.id === id)

    // Create new order with the same data as the old order... just change the date and user information
    this.getUser().subscribe(result => {order.user = result})
    order.date = new Date().toLocaleDateString();
    
    // Push order to orders array and put order array back to local storage
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
  }
}