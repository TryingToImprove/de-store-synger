(function () {
    "use strict";
    
    var
        $window = $(window),
        $body = $("body"),
        $songItems = $body.find(".song-item"),
            
        CONSTS = {
            StartPageViewClass: "startpage-view",
            StartPageViewScrollTop: 120
        },
        helpers = {
            debounce: function(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            }
        },
        privates = {
            updatePageClass: function(){
                var scrollTop = $window.scrollTop();

                if(scrollTop < CONSTS.StartPageViewScrollTop) {
                    if(!$body.hasClass(CONSTS.StartPageViewClass))
                        $body.addClass(CONSTS.StartPageViewClass);;
                } else{
                    $body.removeClass(CONSTS.StartPageViewClass);
                }
            },
            updateCurrentSong: function(){
                var current_song = null;
                
                $songItems.each(function(){                    
                    var $this = $(this),
                        elementId = $this.attr("id"),
                        isVisible = privates.isScrolledIntoView(this);
                    
                    if(isVisible){
                        current_song = elementId;
                        return true;
                    }
                    
                    return false;
                });
                
                $body.attr("data-song", current_song);
            },
            isScrolledIntoView: function(elem) {
                var $elem = $(elem),

                    docViewTop = $window.scrollTop() + 173,            
                    elemTop = $elem.offset().top;

                return elemTop <= docViewTop;
            }
        },
        debounced = {
            updateCurrentSong: helpers.debounce(privates.updateCurrentSong, 30)
        };

    $window.on("scroll", function(e) {                   
        setImmediate(privates.updatePageClass);
        setImmediate(debounced.updateCurrentSong);             
    });
    
    // Initialize smooth scrolling
    smoothScroll.init({
        speed: 750, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeOutQuad', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 65, // Integer. How far to offset the scrolling anchor location in pixels
    });
}());