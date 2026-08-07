import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { FormField } from "../forms/FormField";
import { PrimaryButton } from "../ui/PrimaryButton";
import {
  DISPLAY_PHONE_NUMBER,
  BUSINESS_EMAIL,
  WHATSAPP_PHONE_NUMBER,
  MAPS_URL,
} from "../../utils/whatsapp";

export const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setMessage("");
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#0B0D12] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="GET IN TOUCH 24/7"
          title="Direct Booking & Support Desk"
          subtitle="Located in Panchaxari Nagar, Gadag. Reach us anytime for immediate quotes, outstation travel arrangements, or emergency bookings."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Contact Details Card */}
          <GlassCard className="p-8 border border-[#D4AF37]/30 bg-[#121620]/95 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-white">
                BENAKA TOURS AND TRAVELS
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Panchaxari Nagar 5th Cross, Gadag, Karnataka, India. We are open
                24 hours a day, 7 days a week for all your rental needs.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+916362416120"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0D12] border border-white/10 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Primary Phone Line
                    </span>
                    <strong className="text-base text-white group-hover:text-[#D4AF37] transition-colors">
                      {DISPLAY_PHONE_NUMBER}
                    </strong>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0D12] border border-white/10 hover:border-emerald-400 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Instant WhatsApp Chat
                    </span>
                    <strong className="text-base text-emerald-400">
                      {DISPLAY_PHONE_NUMBER}
                    </strong>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0D12] border border-white/10 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Business Email
                    </span>
                    <strong className="text-base text-white group-hover:text-[#D4AF37] transition-colors">
                      {BUSINESS_EMAIL}
                    </strong>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0D12] border border-white/10">
                  <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Operating Schedule
                    </span>
                    <strong className="text-base text-amber-400">
                      Open 24 Hours / 7 Days a Week
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-[#D4AF37]/40 bg-[#1A1F2C] text-[#D4AF37] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Physical Office Location on Google Maps</span>
              </a>
            </div>
          </GlassCard>

          {/* Quick Message Form */}
          <GlassCard className="p-8 border border-white/10 bg-[#121620]/95 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                Send a Quick Message
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Have a special trip query, corporate transport requirement, or
                multi-day itinerary question? Fill out the form below.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">
                    Message Received!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Thank you, {name}. Our team will contact you at {phone}{" "}
                    within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField label="Your Full Name" required>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Suresh Kulkarni"
                      className="w-full px-3.5 py-2.5 bg-[#0B0D12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </FormField>

                  <FormField label="Mobile Number" required>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 bg-[#0B0D12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </FormField>

                  <FormField label="Your Inquiry / Message" required>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your destination, trip dates, or vehicle preference..."
                      className="w-full px-3.5 py-2.5 bg-[#0B0D12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </FormField>

                  <PrimaryButton
                    type="submit"
                    fullWidth
                    icon={<Send className="w-4 h-4" />}
                  >
                    Submit Inquiry Desk Message
                  </PrimaryButton>
                </form>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
