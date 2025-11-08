// Load Choir team members from localStorage and update the choir page

$(document).ready(function() {
    loadChoirTeamMembersToPage();
    
    // Listen for storage changes to update Choir team dynamically
    if (window.location.pathname.includes('choir.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'choirTeam' || e.originalEvent.key === 'choirPageTeamUpdated') {
                loadChoirTeamMembersToPage();
            }
        });
    }
});

function loadChoirTeamMembersToPage() {
    const choirTeam = JSON.parse(localStorage.getItem('choirTeam') || '[]');
    const container = $('.choir-team-members');
    
    if (container.length === 0) {
        return; // Choir team section doesn't exist on this page
    }
    
    // Clear existing content
    container.empty();
    
    if (choirTeam.length === 0) {
        container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No choir team members yet.</p></div>');
        return;
    }
    
    choirTeam.forEach(function(member) {
        const memberHtml = `
            <div class="column church-staff__item">
                <div class="church-staff__picture">
                    ${member.image ? `<img src="${member.image}" alt="${member.name}">` : '<div style="width: 15rem; height: 15rem; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;"></div>'}
                </div>
                <div class="church-staff__name">
                    ${member.name}
                </div>
                <div class="church-staff__position">
                    ${member.position}
                </div>
            </div>
        `;
        container.append(memberHtml);
    });
}

