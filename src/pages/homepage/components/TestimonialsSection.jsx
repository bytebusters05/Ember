import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "MindfulBot helped me recognize my anxiety patterns and develop coping strategies that actually work. The daily check-ins became a habit I look forward to.",
      author: "College Student, 22",
      location: "California",
      rating: 5,
      category: "Anxiety Management"
    },
    {
      id: 2,
      quote: "As someone skeptical about AI therapy, I was surprised by how personalized and helpful the experience was. It prepared me perfectly for working with a human therapist.",
      author: "Working Professional, 29",
      location: "New York",
      rating: 5,
      category: "Professional Transition"
    },
    {
      id: 3,
      quote: "The crisis support feature was there when I needed it most. Having 24/7 access to resources and immediate help made all the difference during my darkest moments.",
      author: "Graduate Student, 26",
      location: "Texas",
      rating: 5,
      category: "Crisis Support"
    },
    {
      id: 4,
      quote: "The community aspect helped me realize I wasn\'t alone. Reading others\' experiences and sharing my own created a sense of belonging I hadn\'t felt in years.",
      author: "Remote Worker, 34",
      location: "Oregon",
      rating: 5,
      category: "Community Support"
    },
    {
      id: 5,
      quote: "The progress tracking showed me patterns I never noticed. Seeing my improvement over time motivated me to continue my wellness journey.",
      author: "Teacher, 31",
      location: "Florida",
      rating: 5,
      category: "Progress Tracking"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Real Stories, Real Progress
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from individuals who have transformed their mental wellness journey 
            with MindfulBot's support and guidance.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-card rounded-2xl shadow-gentle p-8 sm:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16" style={{ backgroundColor: '#f29819', opacity: 0.05 }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12" style={{ backgroundColor: '#f29819', opacity: 0.05 }}></div>

            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f29819' }}>
                <Icon name="Quote" size={24} color="white" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center relative z-10">
              <blockquote className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 font-medium">
                "{testimonials?.[currentTestimonial]?.quote}"
              </blockquote>

              {/* Rating Stars */}
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={20} color="#f29819" />
                ))}
              </div>

              {/* Author Info */}
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {testimonials?.[currentTestimonial]?.author}
                </p>
                <p className="text-muted-foreground">
                  {testimonials?.[currentTestimonial]?.location}
                </p>
                <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2" style={{ backgroundColor: '#f29819', opacity: 0.1 }}>
                  <Icon name="Tag" size={16} color="#f29819" />
                  <span className="text-sm font-medium" style={{ color: '#f29819' }}>
                    {testimonials?.[currentTestimonial]?.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-surface transition-colors shadow-gentle"
            >
              <Icon name="ChevronLeft" size={20} className="text-foreground" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-surface transition-colors shadow-gentle"
            >
              <Icon name="ChevronRight" size={20} className="text-foreground" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors`}
                style={{ backgroundColor: index === currentTestimonial ? '#f29819' : '#ccc' }}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card rounded-xl shadow-gentle">
            <div className="text-3xl font-bold mb-2" style={{ color: '#f29819' }}>95%</div>
            <div className="text-sm text-muted-foreground">Report Improved Mood</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-gentle">
            <div className="text-3xl font-bold mb-2" style={{ color: '#f29819' }}>87%</div>
            <div className="text-sm text-muted-foreground">Continue to Professional Therapy</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-gentle">
            <div className="text-3xl font-bold mb-2" style={{ color: '#f29819' }}>92%</div>
            <div className="text-sm text-muted-foreground">Would Recommend to Friends</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
