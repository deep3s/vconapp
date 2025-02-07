import {Component, Input} from '@angular/core';

@Component({
  selector: 'review-cards',
  templateUrl: './review-cards.component.html',
  styleUrls: ['./review-cards.component.scss']
})
export class ReviewCardsComponent {

  reviews = [
    {
      title: "Great Experience!",
      content: "The service was outstanding, and the quality exceeded my expectations.",
      name: "Lucy",
      address: "New York, USA",
      imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRKA3s5CVtheOxQ7oh65AfqrS22hz049FunGAwmPHGJfUtmnMj_4SF_H3S0uOZNf0DkfSQNTTFBbS5T-SstNY4ifA",
      stars: 5
    },
    {
      title: "Highly Recommend!",
      content: "Amazing quality and fast delivery. Will buy again!",
      name: "Jane Smith",
      address: "Los Angeles, USA",
      imageUrl: "https://i.pinimg.com/474x/a8/ac/28/a8ac28c7eb5f076273a89d3b76d480d9.jpg",
      stars: 4
    },
    {
      title: "Very Satisfied!",
      content: "The customer support was very helpful and responsive.",
      name: "Alice Johnson",
      address: "Chicago, USA",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgeyb4VQ3BliA_7QKhajZ_uT5rG1GC0O8PAQ&s",
      stars: 5
    },
    {
      title: "Worth Every Penny!",
      content: "Great value for money. The product exceeded my expectations.",
      name: "Robert Brown",
      address: "Houston, USA",
      imageUrl: "https://aalamsalon.com/wp-content/uploads/2014/06/Dallas-best-Men%E2%80%99s-Hair-Salon-Plano-best-Mens-Hair-Salon-Frisco-best-Men-Hair-Salon-Dallas-Mens-Haircut-Plano-Mens-Haircut-Frisco-Men%E2%80%99s-Haircut-AALAM-The-salon-www.aalamsalon.com-7-245x180.jpg",
      stars: 3
    }
  ];


}
