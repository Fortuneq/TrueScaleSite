/**
 * NAVIGATION MODULE
 * 
 * Handles all navigation interactions including:
 * - Smooth scrolling to sections
 * - Contact form modal show/hide
 * - Footer navigation
 * - CTA button interactions
 * 
 * Dependencies: jQuery
 */

(function($) {
  $(function() {
    
    /**
     * MAIN NAVIGATION HANDLER
     * Handles all click events for links and buttons
     */
    $(document).on('click', 'a', function(e) {
      var $this = $(this),
          href = this.href,
          delay = this.dataset.delay || 500;

      // SECTION SCROLLING: Handle hash links for smooth scrolling
      if (href.includes('#') && href.includes('process')) {
        e.preventDefault();
        document.getElementById('process').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      if (href.includes('#') && href.includes('services')) {
        e.preventDefault();
        document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      if (href.includes('#') && href.includes('projects')) {
        e.preventDefault();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      // HERO SCROLL DOWN: Handle scroll down button in hero section
      if ($this.find('.text-link-button').text() === 'Scroll Down') {
        e.preventDefault();
        document.querySelector('.content-section').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      // FOOTER NAVIGATION: Handle footer navigation links
      if ($this.hasClass('footer-link')) {
        var linkText = $this.find('.footer-link-text').text();
        e.preventDefault();
        
        switch(linkText) {
          case 'Главная':
          case 'Home':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
          case 'Как мы работаем':
          case 'Process':
            document.getElementById('process').scrollIntoView({ behavior: 'smooth' });
            break;
          case 'Что мы делаем':
          case 'Services':
            document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' });
            break;
          case 'Кейсы':
          case 'Projects':
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            break;
        }
        return;
      }

      // CTA BUTTON: Handle collaboration button click - shows contact form
      if ($this.hasClass('button') && $this.text().includes('Начать')) {
        e.preventDefault();
        $('.contact-form').show();
        $this.hide();
        return;
      }
      
      // DEFAULT: Prevent default and delay navigation
      e.preventDefault();       
      setTimeout(function(){ window.location = href }, delay);
    });
    
    /**
     * CONTACT FORM BACK BUTTON
     * Handles back button in contact form modal
     */
    $(document).on('click', '.back-button', function(e) {
      e.preventDefault();
      $('.contact-form').hide();
      $('.button[data-w-id="969f17e4-0781-7b32-51fc-5c654f3eae0a"]').show();
    });
    
  });
})(jQuery);