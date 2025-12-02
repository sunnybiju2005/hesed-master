// Load Father profile from Firebase Realtime Database and update the about page

$(document).ready(function() {
    loadFatherProfileToAboutPage();
    
    // Listen for Realtime Database changes to update Father profile dynamically
    if (window.location.pathname.includes('about.html')) {
        if (typeof db !== 'undefined') {
            db.ref('fatherProfile/current').on('value', function(snapshot) {
                loadFatherProfileToAboutPage();
            });
        }
    }
});

async function loadFatherProfileToAboutPage() {
    const container = $('#fatherProfileContainer');
    
    if (container.length === 0) {
        return; // Father profile section doesn't exist on this page
    }
    
    // Clear existing content
    container.empty();
    
    try {
        const fatherProfile = await getFatherProfileFromFirebase();
        
        if (fatherProfile && (fatherProfile.name || fatherProfile.image)) {
            // Show profile from Firebase
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
            // No profile set - show empty state (no default/template data)
            container.html('<div style="text-align: center;"><p style="font-size: 1.6rem; color: #666666; padding: 2rem;">No Father profile set yet.</p></div>');
        }
    } catch (error) {
        console.error('Error loading father profile:', error);
        container.html('<div style="text-align: center;"><p style="font-size: 1.6rem; color: #dd4043; padding: 2rem;">Error loading Father profile. Please refresh the page.</p></div>');
    }
}
