"use client"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/data/testimonials"
import { Quote, Star } from "lucide-react"
import { useEffect, useState } from "react"


export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, currentIndex]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-1 to-orange-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-12 mb-4">
            Ce que disent les parents
          </h2>
          <p className="text-xl text-orange-11 max-w-3xl mx-auto">
            La confiance des familles est notre plus belle récompense. 
            Découvrez leurs témoignages.
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/90 backdrop-blur-sm border-orange-6 shadow-lg max-w-3xl mx-auto">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-6">
                        <Quote className="h-12 w-12 text-purple-9" />
                      </div>
                      
                      <p className="text-lg text-orange-11 leading-relaxed mb-8 italic">
                        &quot;{testimonial.content}&quot;
                      </p>
                      
                      <div className="flex items-center justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-6 w-6 text-yellow-500 fill-current mx-0.5" 
                          />
                        ))}
                      </div>
                      
                      <div>
                        <p className="text-lg font-semibold text-orange-12 mb-1">
                          {testimonial.name}
                        </p>
                        <p className="text-purple-9 font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-purple-9' 
                  : 'bg-orange-6 hover:bg-orange-8'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
