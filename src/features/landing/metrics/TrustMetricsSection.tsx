import React, { useRef, useState, useEffect } from "react";
import { Car, Users, Star, Award, Clock, Calendar } from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isVisible: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  isVisible,
}) => {
  const [count, setCount] = useState<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        setCount(Math.floor(easeOutQuad * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const TrustMetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      id: "fleet",
      label: "Active Vehicles",
      number: 11,
      suffix: "+",
      subtext: "Sedans, MUVs, SUVs & Coaches",
      icon: Car,
    },
    {
      id: "clients",
      label: "Happy Clients",
      number: 500,
      suffix: "+",
      subtext: "Family & Corporate Journeys",
      icon: Users,
    },
    {
      id: "reviews",
      label: "Verified Reviews",
      number: 21,
      suffix: "+",
      subtext: "Patrons in Gadag & Hubballi",
      icon: Award,
    },
    {
      id: "rating",
      label: "Average Rating",
      customDisplay: BUSINESS_INFO.metrics.averageRatingDisplay,
      subtext: "Customer Satisfaction Score",
      icon: Star,
    },
    {
      id: "year",
      label: "Established",
      customDisplay: `Since ${BUSINESS_INFO.establishedYear}`,
      subtext: "Years of Chauffeur Experience",
      icon: Calendar,
    },
    {
      id: "service",
      label: "Service Hours",
      customDisplay: "24/7 Service",
      subtext: "Round-The-Clock Dispatch",
      icon: Clock,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[#07080B] border-y border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((m) => {
            const IconComp = m.icon;
            return (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-[#0B0D12] border border-white/10 flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#D4AF37]/40 transition-all duration-300 shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {m.number !== undefined ? (
                    <AnimatedNumber
                      end={m.number}
                      suffix={m.suffix}
                      isVisible={isVisible}
                    />
                  ) : (
                    <span>{m.customDisplay}</span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200">
                    {m.label}
                  </div>
                  <div className="text-[10px] text-slate-400">{m.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
