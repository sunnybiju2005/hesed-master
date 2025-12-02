// Load news and activities from Firebase and update the index page

let newsLoaderInitialized = false;

$(document).ready(function() {
    if (!newsLoaderInitialized) {
        loadNewsToIndexPage();
        newsLoaderInitialized = true;
    }
    
    // Listen for Realtime Database changes to update news dynamically (only if on index page)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        // Set up real-time listener for news and activities updates
        if (typeof db !== 'undefined') {
            db.ref('news').on('value', function(snapshot) {
                loadNewsToIndexPage();
            });
            db.ref('activities').on('value', function(snapshot) {
                loadNewsToIndexPage();
            });
        }
    }
});

async function loadNewsToIndexPage() {
    const newsTrack = $('.news-scroll-track');
    
    if (newsTrack.length === 0) {
        return; // News section doesn't exist on this page
    }
    
    // Clear ALL existing items completely
    newsTrack.empty();
    
    // Stop any existing animations
    newsTrack.css('animation', 'none');
    
    try {
        // Load both news and activities
        const newsItems = await getAllNewsItemsFromFirebase();
        const activityItems = await getAllActivityItemsFromFirebase();
        
        // Combine news and activities, sort by date (newest first)
        const allItems = [...newsItems, ...activityItems].sort(function(a, b) {
            // Sort by date if available, otherwise by createdAt
            if (a.date && b.date) {
                return new Date(b.date) - new Date(a.date);
            }
            return (b.createdAt || 0) - (a.createdAt || 0);
        });
        
        if (allItems.length > 0) {
            // Add all items (news and activities)
            allItems.forEach(function(item) {
                const imageSrc = item.image || 'images/thumbs/events/event-1000.jpg';
                const newsItemHtml = `
                    <div class="news-item">
                        <div class="news-image">
                            <img src="${imageSrc}" alt="${item.title}">
                        </div>
                        <div class="news-content">
                            <h4>${item.title}</h4>
                            <p>${item.text}</p>
                            <span class="news-date">${item.date}</span>
                        </div>
                    </div>
                `;
                newsTrack.append(newsItemHtml);
            });
            
            // Add duplicates ONLY ONCE for seamless loop
            const originalItems = newsTrack.find('.news-item');
            originalItems.clone().appendTo(newsTrack);
            
            // Restart animation
            setTimeout(function() {
                newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
            }, 10);
        } else {
            // No items - show empty state
            // Don't show any default/template items
            newsTrack.html('<div class="news-item" style="text-align: center; padding: 2rem;"><p style="color: #999; font-size: 1.4rem;">No news or activities yet. Check back soon!</p></div>');
        }
    } catch (error) {
        console.error('Error loading news and activities:', error);
        // Don't show default items on error - just show empty state
        newsTrack.html('<div class="news-item" style="text-align: center; padding: 2rem;"><p style="color: #999; font-size: 1.4rem;">Unable to load news. Please refresh the page.</p></div>');
    }
}

