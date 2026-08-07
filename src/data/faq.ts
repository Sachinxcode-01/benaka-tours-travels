export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "rental" | "driver" | "payment" | "location";
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Can I rent a vehicle for a few weeks or months?",
    answer:
      "Yes! We offer flexible daily, weekly, and custom multi-week outstation rental packages with dedicated chauffeurs tailored to your stay.",
    category: "rental",
  },
  {
    id: "faq-2",
    question: "Do you provide a driver with all vehicle rentals?",
    answer:
      "Yes! Every single vehicle rental at BENAKA TOURS AND TRAVELS is 100% chauffeur-driven by our certified professional drivers.",
    category: "driver",
  },
  {
    id: "faq-3",
    question: "Do you offer self-drive car rentals?",
    answer:
      "No. All rentals are strictly 100% chauffeur-driven. We do not provide self-drive vehicles under any circumstances, ensuring your safety, vehicle maintenance standards, and peace of mind.",
    category: "driver",
  },
  {
    id: "faq-4",
    question: "Am I responsible for vehicle damage during the trip?",
    answer:
      "No. All our vehicles are driven exclusively by our certified professional chauffeurs who take full operational responsibility during the journey.",
    category: "driver",
  },
  {
    id: "faq-5",
    question: "Where is the main office of Benaka Tours & Travels located?",
    answer:
      "Our main hub is located at Panchaxari Nagar 5th Cross, Gadag, Karnataka 582101, India. Doorstep pickup is available anywhere in Gadag and nearby regions.",
    category: "location",
  },
  {
    id: "faq-6",
    question: "What are your operating hours?",
    answer:
      "We operate 24 hours a day, 7 days a week (24/7). You can contact us for urgent trip requests, flight pickups, or emergency travel at any hour.",
    category: "location",
  },
  {
    id: "faq-7",
    question: "What types of vehicles are available in your fleet?",
    answer:
      "Our 12-vehicle fleet spans Sedans (Swift Dzire, Hyundai Aura), MUVs (Ertiga, Innova Crysta, Toofan Cruiser), SUVs (Scorpio, Bolero, Brezza, Grand Vitara, Thar), Minibuses (13-Seater Tempo Traveller), and Heavy Coaches (25-Seater Bus).",
    category: "rental",
  },
  {
    id: "faq-8",
    question: "How does the booking process work?",
    answer:
      "Submit your route, dates, and vehicle preference through our online inquiry wizard, or contact us directly on WhatsApp or Call (+91 63624 16120) to receive an instant custom quotation.",
    category: "payment",
  },
  {
    id: "faq-9",
    question: "Do you offer outstation travel outside Karnataka?",
    answer:
      "Yes! We provide outstation trips across Karnataka, Goa, Maharashtra, Andhra Pradesh, Telangana, and Tamil Nadu with all necessary interstate permits and experienced highway chauffeurs.",
    category: "rental",
  },
  {
    id: "faq-10",
    question: "How is the final fare quote confirmed?",
    answer:
      "We do not publish fixed static rates. Your quotation is calculated dynamically based on trip route, distance, vehicle type, and duration, and confirmed directly via WhatsApp or Phone call.",
    category: "payment",
  },
];
