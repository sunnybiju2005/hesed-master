// Load KCYM team members from localStorage and update the KCYM page

$(document).ready(function() {
    loadKCYMTeamToPage();
    
    // Listen for storage changes to update KCYM team dynamically
    if (window.location.pathname.includes('kcym.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'kcymTeam' || e.originalEvent.key === 'kcymPageTeamUpdated') {
                loadKCYMTeamToPage();
            }
        });
    }
});

function loadKCYMTeamToPage() {
    const kcymTeam = JSON.parse(localStorage.getItem('kcymTeam') || '[]');
    const teamContainer = $('.kcym-team-members');
    
    if (teamContainer.length === 0) {
        return; // KCYM team section doesn't exist on this page
    }
    
    // Clear existing items
    teamContainer.empty();
    
    if (kcymTeam.length > 0) {
        // Add KCYM team members
        kcymTeam.forEach(function(member) {
            const imageSrc = member.image || 'images/avatars/user-01.jpg';
            const memberHtml = `
                <div class="column church-staff__item">
                    <div class="church-staff__picture">
                        <img src="${imageSrc}" alt="${member.name}">
                    </div>
                    <h4 class="church-staff__name">
                        ${member.name}
                        <span class="church-staff__position">
                            ${member.position}
                        </span>
                    </h4>
                </div>
            `;
            teamContainer.append(memberHtml);
        });
    }
}

