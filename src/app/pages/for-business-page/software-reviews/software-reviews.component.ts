import { Component } from '@angular/core';

@Component({
  selector: 'software-reviews',
  templateUrl: './software-reviews.component.html',
  styleUrls: ['./software-reviews.component.scss']
})
export class SoftwareReviewsComponent {
  stars = Array(5);
  // Store the image URL in the component class.
  imageUrl: string = 'https://www.fresha.com/assets/_next/static/images/capterra-30d3638b226405b76e8a6e47f3d32bfa.png';

  reviews = [
    {
     text: "I absolutely love V-Cut Salon because it provides a top-notch, professional hair experience with exceptional service, personalized styling, and a welcoming atmosphere. The team at V-Cut is always up to date with the latest trends, and I’m consistently impressed by the level of care and attention to detail they give to every client. The salon's commitment to using high-quality products and offering expert advice ensures that I always leave feeling my best. V-Cut Salon is truly the best place to relax and transform your look!",
      name: "Pamela B., Salon owner, NYC"
    },
    {
      text: "V-Cut Salon is my go-to place for a stylish and relaxing experience, where I can trust the talented team to give me a perfect cut and color every time. The atmosphere is warm and inviting, making it a great escape from the hustle and bustle of daily life. They use the best products, and I love how they always stay ahead with the latest hair trends and techniques. From the moment I walk in, I feel like I'm in great hands with the friendly and skilled staff. V-Cut Salon consistently exceeds my expectations, leaving me feeling refreshed and fabulous after every visit.",
      name: "Alex E., Hair stylist and owner, San Francisco, U.S."
    },
    {
      text: "I’m so glad I discovered V-Cut Salon because they offer an incredible combination of expertise, friendly service, and a relaxing environment that makes every visit special. The stylists are not only professional but also take the time to understand exactly what I want, ensuring that I leave completely satisfied every time. Whether it’s a trim or a bold new look, I can always count on them to deliver amazing results. The quality of the products they use really makes a difference, and I can feel my hair being treated with the utmost care. V-Cut Salon truly offers a top-tier experience from start to finish!",
      name: "Gayle S., Business owner, London"
    },
    {
      text: "At V-Cut Salon, I always feel pampered and well taken care of, thanks to the professional and attentive team who go above and beyond to deliver the best service. They listen to my ideas and provide expert recommendations, which has helped me achieve the perfect look every time. The salon’s modern and stylish ambiance adds to the overall enjoyable experience, making each visit a true pleasure. I trust V-Cut Salon for all my hair needs, as they consistently provide exceptional results and personalized care. I can’t recommend them enough for anyone looking for a high-quality, comfortable salon experience.",
      name: "Pamela B., Salon owner, NYC"
    },
    {
      text: "V-Cut Salon is the place to be for anyone looking for high-end service with a personal touch. From the welcoming staff to the expert stylists, I always feel at ease and confident in their abilities. The range of services they offer, from haircuts to treatments, is amazing, and I’ve always left feeling more refreshed and satisfied than when I walked in. I love how they cater to my specific hair needs and make recommendations that keep my look fresh and exciting. The quality of service at V-Cut Salon is unmatched, and it’s become my favorite salon.",
      name: "Alex E., Hair stylist and owner, San Francisco, U.S."
    },
    {
      text: "Whenever I visit V-Cut Salon, I know I’m in great hands. The team is always professional, and they provide excellent service with a personal touch that makes me feel valued as a client. I’m constantly impressed by their attention to detail, whether it’s a quick trim or a major style change. The atmosphere at the salon is inviting and relaxing, allowing me to unwind while getting my hair done. V-Cut Salon’s expertise and dedication to quality keep me coming back time and time again for all my hair needs.",
      name: "Gayle S., Business owner, London"
    },
    {
      text: "V-Cut Salon is my go-to place for a stylish and relaxing experience, where I can trust the talented team to give me a perfect cut and color every time. The atmosphere is warm and inviting, making it a great escape from the hustle and bustle of daily life. They use the best products, and I love how they always stay ahead with the latest hair trends and techniques. From the moment I walk in, I feel like I'm in great hands with the friendly and skilled staff. V-Cut Salon consistently exceeds my expectations, leaving me feeling refreshed and fabulous after every visit.",
      name: "Alex E., Hair stylist and owner, San Francisco, U.S."
    },
    {
      text: "I’m so glad I discovered V-Cut Salon because they offer an incredible combination of expertise, friendly service, and a relaxing environment that makes every visit special. The stylists are not only professional but also take the time to understand exactly what I want, ensuring that I leave completely satisfied every time. Whether it’s a trim or a bold new look, I can always count on them to deliver amazing results. The quality of the products they use really makes a difference, and I can feel my hair being treated with the utmost care. V-Cut Salon truly offers a top-tier experience from start to finish!",
      name: "Gayle S., Business owner, London"
    },
    {
      text: "At V-Cut Salon, I always feel pampered and well taken care of, thanks to the professional and attentive team who go above and beyond to deliver the best service. They listen to my ideas and provide expert recommendations, which has helped me achieve the perfect look every time. The salon’s modern and stylish ambiance adds to the overall enjoyable experience, making each visit a true pleasure. I trust V-Cut Salon for all my hair needs, as they consistently provide exceptional results and personalized care. I can’t recommend them enough for anyone looking for a high-quality, comfortable salon experience.",
      name: "Pamela B., Salon owner, NYC"
    },
    {
      text: "V-Cut Salon is the place to be for anyone looking for high-end service with a personal touch. From the welcoming staff to the expert stylists, I always feel at ease and confident in their abilities. The range of services they offer, from haircuts to treatments, is amazing, and I’ve always left feeling more refreshed and satisfied than when I walked in. I love how they cater to my specific hair needs and make recommendations that keep my look fresh and exciting. The quality of service at V-Cut Salon is unmatched, and it’s become my favorite salon.",
      name: "Alex E., Hair stylist and owner, San Francisco, U.S."
    }
  ];

  currentIndex: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.pages = Array(this.reviews.length).fill(0).map((x, i) => i);
  }

  nextSlide() {
    if (this.currentIndex < this.reviews.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.reviews.length - 1;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
