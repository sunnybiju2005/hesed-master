// Load news and activities from localStorage and update the index page

let newsLoaderInitialized = false;

$(document).ready(function() {
    if (!newsLoaderInitialized) {
        loadNewsToIndexPage();
        newsLoaderInitialized = true;
    }
    
    // Listen for Realtime Database changes to update news dynamically (only if on index page)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        // Set up real-time listener for news updates
        if (typeof db !== 'undefined') {
            db.ref('news').on('value', function(snapshot) {
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
        const newsItems = await getAllNewsItemsFromFirebase();
        
        if (newsItems.length > 0) {
        // Add news items (only once)
        newsItems.forEach(function(item) {
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
        
        // Add duplicates ONLY ONCE for seamless loop (only if we have items)
        if (newsItems.length > 0) {
            const originalItems = newsTrack.find('.news-item');
            originalItems.clone().appendTo(newsTrack);
        }
        
            // Restart animation
            setTimeout(function() {
                newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
            }, 10);
        } else {
        // Show default items if no news items exist
        const defaultItems = [
            {
                title: 'Christmas Service Celebration',
                text: 'Our annual Christmas service was held on December 24th with great joy and fellowship. The service featured beautiful music, inspiring messages, and a wonderful time of worship together.',
                date: 'Dec 24, 2024',
                image: 'images/thumbs/events/event-1000.jpg'
            },
            {
                title: 'Youth Conference 2025',
                text: 'Exciting youth conference scheduled for January 5th, 2025. Registration is now open for all young people. Join us for inspiring sessions, worship, and fellowship.',
                date: 'Jan 5, 2025',
                image: 'images/thumbs/events/event-2000.jpg'
            }
        ];
        
        defaultItems.forEach(function(item) {
            const newsItemHtml = `
                <div class="news-item">
                    <div class="news-image">
                        <img src="${item.image}" alt="${item.title}">
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
        }
    } catch (error) {
        console.error('Error loading news:', error);
        // Show default items on error
        const defaultItems = [
            {
                title: 'Christmas Service Celebration',
                text: 'Our annual Christmas service was held on December 24th with great joy and fellowship. The service featured beautiful music, inspiring messages, and a wonderful time of worship together.',
                date: 'Dec 24, 2024',
                image: 'images/thumbs/events/event-1000.jpg'
            },
            {
                title: 'Youth Conference 2025',
                text: 'Exciting youth conference scheduled for January 5th, 2025. Registration is now open for all young people. Join us for inspiring sessions, worship, and fellowship.',
                date: 'Jan 5, 2025',
                image: 'images/thumbs/events/event-2000.jpg'
            }
        ];
        
        defaultItems.forEach(function(item) {
            const newsItemHtml = `
                <div class="news-item">
                    <div class="news-image">
                        <img src="${item.image}" alt="${item.title}">
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
        
        const originalItems = newsTrack.find('.news-item');
        originalItems.clone().appendTo(newsTrack);
        
        setTimeout(function() {
            newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
        }, 10);
    }
}

