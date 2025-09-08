"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { useEffect, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Maman de Lucas (3 ans)",
    content: "Une garderie exceptionnelle ! L'équipe est formidable, très professionnelle et bienveillante. Lucas s'épanouit chaque jour et nous raconte ses découvertes avec enthousiasme.",
    rating: 5
  },
  {
    id: 2,
    name: "Pierre Martin",
    role: "Papa de Sophie (2 ans)",
    content: "Nous sommes ravis de cette garderie. L'environnement est chaleureux, les activités sont variées et adaptées. Sophie a fait d'énormes progrès depuis qu'elle y va.",
    rating: 5
  },
  {
    id: 3,
    name: "Amélie Rousseau",
    role: "Maman de Tom (18 mois)",
    content: "Un accueil formidable dès le premier jour. L'équipe a su rassurer Tom et nous aussi ! C'est rassurant de savoir notre enfant entre de si bonnes mains.",
    rating: 5
  },
  {
    id: 4,
    name: "Jean-Luc Moreau",
    role: "Papa d'Emma (4 ans)",
    content: "Emma adore aller à la garderie ! Les activités sont variées et stimulantes. Nous apprécions particulièrement la communication régulière avec l'équipe.",
    rating: 5
  },
  {
    id: 5,
    name: "Sophie Leroy",
    role: "Maman de Théo (2 ans)",
    content: "Un environnement sécurisé et bienveillant. Théo s'est adapté très rapidement grâce à la patience et la douceur de l'équipe. Merci pour tout !",
    rating: 5
  }
];

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
