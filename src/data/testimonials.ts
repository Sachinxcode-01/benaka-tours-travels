export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  vehicleRented: string;
  tripType: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Suresh Kulkarni",
    location: "Gadag, Karnataka",
    rating: 5,
    comment:
      "Highly reliable service for outstation trips. We booked a Toyota Innova for our family visit to Hubballi. The driver knew the routes perfectly and was very polite. Best travel agency in Gadag!",
    vehicleRented: "Toyota Innova Crysta",
    tripType: "Outstation Family Trip",
  },
  {
    id: "2",
    name: "Deepa G.",
    location: "Gadag, Karnataka",
    rating: 5,
    comment:
      "Outstanding support and well-maintained cars. We rented a Maruti Ertiga for a weekend wedding. The inquiry process was smooth on WhatsApp and the door-step pickup saved us so much time.",
    vehicleRented: "Maruti Ertiga",
    tripType: "Wedding Transportation",
  },
  {
    id: "3",
    name: "Vijay Hiremath",
    location: "Gadag, Karnataka",
    rating: 5,
    comment:
      "Our go-to choice for corporate tours. The 13-seater Tempo Traveller was in top condition and very comfortable for a long journey. Special thanks to the driver for his patience.",
    vehicleRented: "Tempo Traveller (13-Seater)",
    tripType: "Corporate Tour",
  },
];
