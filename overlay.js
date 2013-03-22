// Initializes all overlays
function overlay_begin() {
  $('.overlay-container').each(function() {
    initialize_overlay(this);
  });
}

// Initializes a single element as an overlay
function initialize_overlay(element) {        
  // Create an overlay <div> to follow mouse
  $(element).append('<div class="overlay-window"></div>');
    
  // Make "hidden image" the background of the overlay
  $('.overlay-window', element).css({
    'background-image': 'url('+ ($('img.overlay:first', element).attr('src')) + ')'
  });
  
  // Listen for mouse over
  $(element).hover(
    // Entering element
    function (e) {
      var overlay = $(this).children('.overlay-window:first');
      
      // Track overlay to mouse movement
      $(this).bind('mousemove', function (e) {
        overlay_under_mouse(overlay, e.pageX, e.pageY, $(this).offset());
      });
      
      // Hide cursor
      overlay.css({
        'cursor': 'none'
      });
      
      // Align overlay to mouse to begin mousemove events
      overlay_under_mouse(overlay, e.pageX, e.pageY, $(this).offset());
      
      // Show overlay
      overlay.show();
    },
    
    // Leaving element
    function (e) {
      var overlay = $(this).children('.overlay-window:first');
      
      // Do not track mouse inside underlay
      $(this).unbind('mousemove');
      
      // Hide overlay window
      overlay.hide();
      
      // Show cursor again
      overlay.css({
          'cursor': 'auto'
      });
    }
  ); // $(element).hover(...);
}

function overlay_under_mouse(overlay, mouse_x, mouse_y, parent_offset) {
  // Event occurs on .overlay-over object
  set_overlay_position(
    overlay,
    mouse_x - parent_offset.left - overlay.width() / 2,
    mouse_y - parent_offset.top - overlay.height() / 2
  );
}

// Moves `element' while moving the background counter to
// its new position.
function set_overlay_position(overlay, left, top) {
  overlay.css({
    left: left,
    top: top,
    backgroundPosition: (-left).toString() + "px " + (-top).toString() + "px"
  });
}
