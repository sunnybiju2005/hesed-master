// Admin Login Shortcut - Ctrl+A
$(document).ready(function() {
    $(document).on('keydown', function(e) {
        // Check if Ctrl+A is pressed
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            // Redirect to admin login page
            window.location.href = 'admin-login.html';
        }
    });
});

