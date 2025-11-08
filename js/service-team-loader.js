// Load service team members from localStorage and update the about page

$(document).ready(function() {
    loadServiceTeamToAboutPage();
    
    // Listen for storage changes to update service team dynamically
    if (window.location.pathname.includes('about.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'serviceTeam' || e.originalEvent.key === 'aboutPageServiceTeamUpdated') {
                loadServiceTeamToAboutPage();
            }
        });
    }
});

function loadServiceTeamToAboutPage() {
    const serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
    const staffContainer = $('.church-staff');
    
    if (staffContainer.length === 0) {
        return; // Service team section doesn't exist on this page
    }
    
    // Clear existing items
    staffContainer.empty();
    
    if (serviceTeam.length > 0) {
        // Add service team members
        serviceTeam.forEach(function(member) {
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
            staffContainer.append(memberHtml);
        });
    } else {
        // Show default items if no service team members exist
        const defaultMembers = [
            {
                name: 'Jonathan Doe',
                position: 'Lead Pastor',
                image: 'images/avatars/user-01.jpg'
            },
            {
                name: 'Jane Doe',
                position: 'Lead Pastor',
                image: 'images/avatars/user-02.jpg'
            },
            {
                name: 'Charles Spurgeon',
                position: 'Associate Pastor',
                image: 'images/avatars/user-03.jpg'
            },
            {
                name: 'Martin Luther',
                position: 'Associate Pastor',
                image: 'images/avatars/user-04.jpg'
            },
            {
                name: 'John Wesley',
                position: 'Youth Pastor',
                image: 'images/avatars/user-05.jpg'
            },
            {
                name: 'Aimee Semple McPherson',
                position: 'Kids Church Director',
                image: 'images/avatars/user-06.jpg'
            }
        ];
        
        defaultMembers.forEach(function(member) {
            const memberHtml = `
                <div class="column church-staff__item">
                    <div class="church-staff__picture">
                        <img src="${member.image}" alt="${member.name}">
                    </div>
                    <h4 class="church-staff__name">
                        ${member.name}
                        <span class="church-staff__position">
                            ${member.position}
                        </span>
                    </h4>
                </div>
            `;
            staffContainer.append(memberHtml);
        });
    }
}

