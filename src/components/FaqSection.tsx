
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "How does ReviewUplift collect reviews?",
      answer: "ReviewUplift sends automated email and SMS requests to your customers asking them to leave a review. You can customize the timing, frequency, and template of these requests to maximize your review collection efforts."
    },
    {
      question: "Which review platforms do you support?",
      answer: "We support all major review platforms including Google, Facebook, Yelp, TripAdvisor, and 100+ industry-specific sites. You can connect all your profiles and monitor them in one dashboard."
    },
    {
      question: "Can I respond to reviews from ReviewUplift?",
      answer: "Yes, you can respond to all reviews from our platform. We also provide AI-powered response suggestions to help you craft the perfect response to both positive and negative reviews."
    },
    {
      question: "How do I display reviews on my website?",
      answer: "ReviewUplift offers customizable widgets that you can embed on your website to showcase your best reviews. You can filter by rating, platform, and more to display only the reviews you want."
    },
    {
      question: "Do you have a mobile app?",
      answer: "Yes, we have mobile apps for both iOS and Android so you can manage your reviews on the go. You'll receive real-time notifications when you get new reviews and can respond directly from the app."
    },
    {
      question: "How long is the free trial?",
      answer: "We offer a 14-day free trial for all paid plans. No credit card is required to start your trial, and you can cancel anytime."
    },
    {
      question: "Can I use ReviewUplift for multiple locations?",
      answer: "Yes, ReviewUplift supports multi-location businesses. Our Professional plan includes up to 3 locations, and our Enterprise plan offers unlimited locations with centralized management."
    },
    {
      question: "Is there a limit to how many review requests I can send?",
      answer: "Each plan has a monthly limit of review requests you can send. The Starter plan includes 100 requests/month, the Professional plan includes 500 requests/month, and the Enterprise plan offers unlimited requests."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base text-orange-600 font-semibold tracking-wide uppercase">FAQ</p>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get answers to the most common questions about ReviewUplift.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Still have questions? Contact our support team for assistance.
          </p>
          <div className="mt-4">
            <button className="text-orange-600 font-medium hover:text-orange-700 flex items-center justify-center mx-auto">
              Contact Support
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
