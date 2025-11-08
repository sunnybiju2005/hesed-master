// Load Father profile from localStorage and update the about page

$(document).ready(function() {
    loadFatherProfileToAboutPage();
    
    // Listen for storage changes to update Father profile dynamically
    if (window.location.pathname.includes('about.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'fatherProfile' || e.originalEvent.key === 'aboutPageFatherProfileUpdated') {
                loadFatherProfileToAboutPage();
            }
        });
    }
});

function loadFatherProfileToAboutPage() {
    const fatherProfile = JSON.parse(localStorage.getItem('fatherProfile') || '{}');
    const container = $('#fatherProfileContainer');
    
    if (container.length === 0) {
        return; // Father profile section doesn't exist on this page
    }
    
    // Clear existing content
    container.empty();
    
    if (fatherProfile.name || fatherProfile.image) {
        const profileHtml = `
            <div style="text-align: center;">
                ${fatherProfile.image ? `
                <div style="margin-bottom: 2rem;">
                    <img src="${fatherProfile.image}" alt="${fatherProfile.name || 'Father'}" style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover; border: 6px solid #000000; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                </div>
                ` : '<div style="width: 300px; height: 300px; border-radius: 50%; background-color: #e0e0e0; border: 6px solid #000000; margin: 0 auto 2rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);"></div>'}
                <h3 style="font-family: 'Montserrat', sans-serif; font-size: 2.8rem; font-weight: 700; color: #000000; margin: 0;">
                    ${fatherProfile.name || 'Father'}
                </h3>
            </div>
        `;
        container.html(profileHtml);
    } else {
        // Show placeholder if no profile set
        container.html(`
            <div style="text-align: center;">
                <div style="width: 300px; height: 300px; border-radius: 50%; background-color: #e0e0e0; border: 6px solid #000000; margin: 0 auto 2rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);"></div>
                <h3 style="font-family: 'Montserrat', sans-serif; font-size: 2.8rem; font-weight: 700; color: #000000; margin: 0;">Father</h3>
            </div>
        `);
    }
}

