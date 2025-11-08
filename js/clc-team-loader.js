// Load CLC team members from localStorage and update the CLC page

$(document).ready(function() {
    loadCLCTeamToPage();
    
    // Listen for storage changes to update CLC team dynamically
    if (window.location.pathname.includes('clc.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'clcTeam' || e.originalEvent.key === 'clcPageTeamUpdated') {
                loadCLCTeamToPage();
            }
        });
    }
});

function loadCLCTeamToPage() {
    const clcTeam = JSON.parse(localStorage.getItem('clcTeam') || '[]');
    const teamContainer = $('.clc-team-members');
    
    if (teamContainer.length === 0) {
        return; // CLC team section doesn't exist on this page
    }
    
    // Clear existing items
    teamContainer.empty();
    
    if (clcTeam.length > 0) {
        // Add CLC team members
        clcTeam.forEach(function(member) {
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

