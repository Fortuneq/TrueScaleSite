/**
 * CONTACT FORM MODULE
 * 
 * Handles contact form submission to Python backend
 * Integrates with Telegram bot via our custom API
 * 
 * Features:
 * - Form validation
 * - AJAX submission to /api/submit-form
 * - Success/error message handling
 * - Bypasses external API blocker using originalAjax
 * 
 * Dependencies: jQuery, api-blocker.js (for window.originalAjax)
 */

(function($) {
  $(function() {
    
    /**
     * FORM SUBMISSION HANDLER
     * Collects form data and sends to Python backend
     */
    $('#wf-form-order-form').on('submit', function(e) {
      e.preventDefault();
      
      // Collect all form field values
      const formData = {
        name: $('#name').val(),
        company: $('#company').val(),
        service: $('#service').val(),
        phone: $('#phone').val(),
        email: $('#email').val()
      };
      
      // Validate required fields
      if (!formData.name || !formData.company || !formData.service || !formData.phone || !formData.email) {
        $('.w-form-fail').show();
        return;
      }
      
      // Send to our Python backend using original AJAX (bypasses external API blocker)
      window.originalAjax({
        url: '/api/submit-form',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        timeout: 10000, // 10 second timeout
        
        success: function(response) {
          console.log('✅ Form submitted successfully');
          $('.w-form').hide();
          $('.success-message').show();
          
          // Reset form after successful submission
          setTimeout(function() {
            $('#wf-form-order-form')[0].reset();
          }, 100);
        },
        
        error: function(xhr, status, error) {
          console.error('❌ Form submission failed:', error);
          $('.w-form-fail').show();
          
          // Hide error message after 5 seconds
          setTimeout(function() {
            $('.w-form-fail').hide();
          }, 5000);
        }
      });
      
    });
    
  });
})(jQuery);