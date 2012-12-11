// ==UserScript==
// @name          High Contrast Mode Fix
// @namespace     NA
// @description   Experimental focus notification for high contrast mode.
// @grant         GM_log
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://*.amazon.com/*
// @include       https://*.amazon.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @version       2012-11-03
// ==/UserScript==

//var cur = -1;
var elements_to_cycle = null; 

// This loads jQuery 
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

/*
 * XXX: Broken focus cycling (needed for navigation with limited haptic input)
 * This is non-functional because of the lack of an aggregate ordered
 * NodeList object */

function main() {
    var code_inject = document.createElement('script');
    
    // Adds js functions to the page for "highlighting"
    code_inject.innerHTML+="function showBorder(el){el.style.border = '1px solid white';el.style.outline='1px solid black';}"
    code_inject.innerHTML+="function hideBorder(el){el.style.border = '';el.style.outline='';}"
    document.getElementsByTagName("head")[0].appendChild(code_inject);


    // Many button-like elements use the word "button" in its id, class, or role
    // Data and analysis was done by Kaitlin Flynn
    var patt = /.*button.*/i;

    // Enable highlighting of anchor tags
    $('a').on('mouseover', function(evt) {
        $(this).css({'border': '1px solid white', 'outline': '1px solid black'});
    }).on('mouseout', function(evt) {
        $(this).css({'border': '', 'outline': ''});
    }).addClass('vis_nav_through');
    
    $('button').on('mouseover', function(evt) {
        $(this).css({'border': '1px solid white', 'outline': '1px solid black'});
    }).on('mouseout', function(evt) {
        $(this).css({'border': '', 'outline': ''});
    }).addClass('vis_nav_through');



    // Enable highlighting of button-like div tags
    $('div').each(function(idx, ele) {
        var el_id = this.getAttribute('id');
        var el_role = this.getAttribute('role');
        var el_class = this.getAttribute('class');
        if (patt.test(el_id) || patt.test(el_role) || patt.test(el_class)) {
            $(this).on('mouseover', function(evt) {
                $(this).css({'border': '1px solid white', 'outline': '1px solid black'});
            }).on('mouseout', function(evt) {
                $(this).css({'border': '', 'outline': ''});
            }).addClass('vis_nav_through');
        }
    });
    
    // Enable highlighting of button-like div tags
    $('label').each(function(idx, ele) {
        var el_id = this.getAttribute('id');
        var el_role = this.getAttribute('role');
        var el_class = this.getAttribute('class');
        if (patt.test(el_id) || patt.test(el_role) || patt.test(el_class)) {
            $(this).on('mouseover', function(evt) {
                $(this).css({'border': '1px solid white', 'outline': '1px solid black'});
            }).on('mouseout', function(evt) {
                $(this).css({'border': '', 'outline': ''});
            }).addClass('vis_nav_through');
        }
    });
    
    // Enable highlighting of button-like div tags
    $('span').each(function(idx, ele) {
        var el_id = this.getAttribute('id');
        var el_role = this.getAttribute('role');
        var el_class = this.getAttribute('class');
        if (patt.test(el_id) || patt.test(el_role) || patt.test(el_class)) {
            $(this).on('mouseover', function(evt) {
                $(this).css({'border': '1px solid white', 'outline': '1px solid black'});
            }).on('mouseout', function(evt) {
                $(this).css({'border': '', 'outline': ''});
            }).addClass('vis_nav_through');
        }
    });

    // Enable highlighting of various gmail/google buttons/links
    var gmail_elements = document.getElementsByTagName("tr");
    var gmail_patt = /zA yO/;
    for(var i = 0; i < gmail_elements.length; i++)
    {
        var el_class = gmail_elements[i].getAttribute('class');

        if(gmail_patt.test(el_class))
        {
            gmail_elements[i].setAttribute('onmouseover', "showBorder(this)");
            gmail_elements[i].setAttribute('onmouseout', "hideBorder(this)");
            $(gmail_elements[i]).addClass('vis_nav_through');
        }
    }
    

    cur_obj = null;
    cur = 0;
    elements_to_cycle = $('.vis_nav_through');
    $(document).on('keypress', function(evt){
        if (evt.keyCode == 39) {
            if (cur_obj == null) {
                cur_obj = $(elements_to_cycle[0]);
                cur_obj.css({'border': '1px solid white', 'outline': '1px solid black'});
                return;
            } 
            
            cur_obj.css({'border': '', 'outline': ''});
            cur_obj = $(elements_to_cycle[++cur % elements_to_cycle.length]);
            cur_obj.css({'border': '1px solid white', 'outline': '1px solid black'});
        }
    
    });
}



/*
 * XXX: Broken sound code (needed for auditory usability enhancement)
var sound_elem = document.createElement('span');
sound_elem.setAttribute('id', 'sound_elem');
sound_elem.innerHTML = "<embed src='http://dl.google.com/dl/chrome/extensions/audio/click.mp3' hidden='true' autostart='false' loop='false' id='click_sound_6389' />";
*/

addJQuery(main);