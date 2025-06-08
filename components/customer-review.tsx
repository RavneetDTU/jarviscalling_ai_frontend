import React from 'react';

function CustomerReview() {
  const reviews = [
    {
      name: "Maria Rodriguez",
      city: "Miami, FL",
      rating: 5,
      quote: "Jarvis AI transformed our restaurant. We never miss reservations anymore!",
      avatar: "MR",
    },
    {
      name: "David Chen",
      city: "San Francisco, CA",
      rating: 5,
      quote: "Our booking efficiency increased by 300%. Best investment we've made.",
      avatar: "DC",
    },
    {
      name: "Sarah Johnson",
      city: "New York, NY",
      rating: 5,
      quote: "Customers love how quickly they get responses. It's like magic!",
      avatar: "SJ",
    },
    {
      name: "Emily Davis",
      city: "Austin, TX",
      rating: 5,
      quote: "It handled over 100 customer queries a day—no complaints!",
      avatar: "ED",
    },
    {
      name: "Michael Lee",
      city: "Seattle, WA",
      rating: 5,
      quote: "Saved us hours of manual work every week. Super helpful!",
      avatar: "ML",
    },
  ];

  return (
    <div className="h-80 w-full flex gap-4 overflow-x-auto px-4 py-6 no-scrollbar">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="w-72 flex-shrink-0 h-fit group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
        >
          <div className="flex items-center space-x-1 mb-4 sm:mb-6">
            {[...Array(review.rating)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-sm sm:text-base md:text-lg text-graphite/80 mb-4 sm:mb-6 italic leading-relaxed">
            "{review.quote}"
          </p>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
              {review.avatar}
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base text-graphite">
                {review.name}
              </div>
              <div className="text-xs sm:text-sm text-graphite/60">
                {review.city}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerReview;
