/**
 * API BLOCKER MODULE
 * 
 * Blocks external API calls while preserving Webflow functionality
 * Intercepts fetch, XMLHttpRequest, and jQuery AJAX calls to external domains
 * 
 * Usage: Include before Webflow scripts to ensure proper blocking
 */

(function() {
  const originalFetch = window.fetch;
  const originalXHR = window.XMLHttpRequest;
  const originalAjax = $.ajax;
  
  // Make original AJAX available globally for our backend calls
  window.originalAjax = originalAjax;
  
  // Domains to block from external API calls
  const blockedDomains = [
    'webflow.com',
    'formdata.webflow.com', 
    'vimeo.com',
    'challenges.cloudflare.com',
    'api.telegram.org'
  ];
  
  /**
   * Override native fetch API
   * Blocks requests to external domains in blockedDomains list
   */
  window.fetch = function(url, options) {
    if (typeof url === 'string' && blockedDomains.some(domain => url.includes(domain))) {
      console.log('🚫 Blocked fetch request to:', url);
      return Promise.reject(new Error('External API blocked'));
    }
    return originalFetch.apply(this, arguments);
  };
  
  /**
   * Override XMLHttpRequest constructor
   * Blocks XHR requests to external domains in blockedDomains list
   */
  window.XMLHttpRequest = function() {
    const xhr = new originalXHR();
    const originalOpen = xhr.open;
    
    xhr.open = function(method, url, async, user, password) {
      if (typeof url === 'string' && blockedDomains.some(domain => url.includes(domain))) {
        console.log('🚫 Blocked XHR request to:', url);
        return;
      }
      return originalOpen.apply(this, arguments);
    };
    
    return xhr;
  };
  
  /**
   * Override jQuery AJAX
   * Blocks jQuery AJAX requests to external domains in blockedDomains list
   */
  $.ajax = function(options) {
    if (options.url && blockedDomains.some(domain => options.url.includes(domain))) {
      console.log('🚫 Blocked jQuery AJAX request to:', options.url);
      return $.Deferred().reject();
    }
    return originalAjax.apply(this, arguments);
  };
  
})();