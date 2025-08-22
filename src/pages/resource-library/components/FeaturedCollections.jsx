import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedCollections = ({ collections, onCollectionSelect }) => {

  const getCollectionIcon = (type) => {
    switch (type) {
      case 'seasonal': return 'Calendar';
      case 'crisis': return 'Shield';
      case 'beginner': return 'GraduationCap';
      case 'advanced': return 'Target';
      case 'popular': return 'TrendingUp';
      default: return 'Folder';
    }
  };

  const getCollectionColor = (type) => {
    switch (type) {
      case 'seasonal': return 'bg-conversion-accent text-white';
      case 'crisis': return 'bg-accent text-white';
      case 'beginner': return 'bg-success text-white';
      case 'advanced': return 'bg-therapeutic-secondary text-white';
      case 'popular': return 'bg-therapeutic-primary text-white';
      default: return 'bg-surface text-foreground';
    }
  };

  const books = [
    {
      id: 'book-1',
      title: 'Master Your Emotions',
      author: 'Thibaut Meurisse',
      domain: 'Trauma & Healing',
      image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/book/s/g/r/master-your-emotions-a-practical-guide-to-overcome-negativity-original-imahb72vhng8xbr3.jpeg?q=70&crop=false',
      summary: 'A groundbreaking work on how the body is affected by trauma and the various paths to recovery.',
      pdfUrl: 'public/assets/Books/Master Your Emotions PDF.pdf'
    },
    {
      id: 'book-2',
      title: 'Good Vibes, Good Life ',
      author: 'Bookey',
      domain: 'Vulnerability & Courage',
      image: 'https://m.media-amazon.com/images/I/61xbuSU9BlL.jpg',
      summary: 'Dr. Brown explores how we can live more courageously by embracing vulnerability and imperfection.',
      pdfUrl: 'public/assets/Books/Good Vibes, Good Life PDF.pdf'
    },
    {
      id: 'book-3',
      title: 'The Power of Subconscious mind',
      author: 'Joseph Murphy',
      domain: 'Growth & Psychology',
      image: 'https://rukminim2.flixcart.com/image/704/844/klo27bk0/regionalbooks/l/x/e/the-power-of-your-subconscious-mind-original-imagyqtgj2yrk2wm.jpeg?q=90&crop=false',
      summary: 'A powerful look at the difference between a fixed mindset and a growth mindset and how it affects our lives.',
      pdfUrl: 'public/assets/Books/The Power of Subconscious mind.pdf'
    },
  ];

  const handleDownload = (bookTitle, pdfUrl) => {
    console.log(`Downloading "${bookTitle}" PDF from URL: ${pdfUrl}`);
    // The book was not downloading because this section was commented out
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft transition-all duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={24} className="text-therapeutic-primary" />
          <h3 className="font-semibold text-foreground text-xl">Featured Collections</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-therapeutic-primary hover:bg-transparent">
          View All
          <Icon name="ArrowRight" size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Main Collection Grid (Now single-column) */}
      <div className="grid grid-cols-1 gap-6">
        {collections?.map((collection) => (
          <div
            key={collection?.id}
            onClick={() => onCollectionSelect(collection)}
            className="bg-surface border border-border rounded-xl p-4 cursor-pointer transform hover:scale-[1.03] hover:shadow-lg transition-all duration-300 group"
          >
            {/* Main Content Flexbox */}
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCollectionColor(collection?.type)}`}>
                  <Icon name={getCollectionIcon(collection?.type)} size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-lg group-hover:text-therapeutic-primary transition-colors duration-300 line-clamp-2">
                    {collection?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{collection?.resourceCount} resources</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {collection?.description}
              </p>
              <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground pt-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{collection?.totalDuration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{collection?.completions}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>{collection?.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Books Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpenText" size={24} className="text-trust-builder" />
            <h3 className="font-semibold text-foreground text-xl">Recommended Reads</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-surface border border-border rounded-xl p-4 shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 relative group"
            >
              <div className="flex items-start mb-4">
                <div className="w-20 h-28 shrink-0 rounded-md overflow-hidden mr-4 shadow-md">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <h4 className="font-semibold text-base text-foreground line-clamp-2">{book.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">by {book.author}</p>
                  <p className="text-xs text-therapeutic-primary font-medium">{book.domain}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {book.summary}
              </p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownload(book.title, book.pdfUrl); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 text-foreground backdrop-blur-sm shadow-md hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!book.pdfUrl}
                >
                  <Icon name="Download" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Crisis Resources */}
      <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-xl">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertTriangle" size={20} className="text-accent" />
          <h4 className="font-semibold text-foreground text-lg">Need Immediate Support?</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Access crisis resources and emergency support right now.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-accent text-accent hover:bg-accent hover:text-white"
            iconName="Phone"
            iconPosition="left"
          >
            Crisis Hotline
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-accent text-accent hover:bg-accent hover:text-white"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Chat Support
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-accent text-accent hover:bg-accent hover:text-white"
            iconName="MapPin"
            iconPosition="left"
          >
            Find Help Nearby
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;