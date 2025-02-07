import { Component } from '@angular/core';

@Component({
  selector: 'partner-review',
  templateUrl: './partner-review.component.html',
  styleUrls: ['./partner-review.component.scss']
})
export class PartnerReviewComponent {
  imageUrl: string = 'https://img.lovepik.com/photo/20230420/medium/lovepik-a-beautiful-mixed-race-african-american-girl-or-young-woman-laying-image_352046726.jpg';
  testimonial: string = 'By far the best experience I’ve had with a salon booking system in 20 years!\n' +
      'It\'s super user-friendly and intuitive – their no-show and cancellation policy and text reminders\n' +
      'have ensured we have not had one no-show since we opened a year and a half ago!';
  name: string = 'Ursula, Bond Salon';
  stars: number[] = [1, 2, 3, 4, 5];
}

