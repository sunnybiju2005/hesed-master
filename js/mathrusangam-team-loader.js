// Load Mathrusangam team members from localStorage and update the Mathrusangam page

$(document).ready(function() {
    loadMathrusangamTeamToPage();
    
    // Listen for storage changes to update Mathrusangam team dynamically
    if (window.location.pathname.includes('mathrusangam.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'mathrusangamTeam' || e.originalEvent.key === 'mathrusangamPageTeamUpdated') {
                loadMathrusangamTeamToPage();
            }
        });
    }
});

function loadMathrusangamTeamToPage() {
    const mathrusangamTeam = JSON.parse(localStorage.getItem('mathrusangamTeam') || '[]');
    const teamContainer = $('.mathrusangam-team-members');
    
    if (teamContainer.length === 0) {
        return; // Mathrusangam team section doesn't exist on this page
    }
    
    // Clear existing items
    teamContainer.empty();
    
    if (mathrusangamTeam.length > 0) {
        // Add Mathrusangam team members
        mathrusangamTeam.forEach(function(member) {
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

