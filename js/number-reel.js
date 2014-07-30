/* ==========================================================
 * number-reel.js
 * ==========================================================
 * Copyright 2013 Ben Harrison.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



;(function($, undefined) {
    "use strict";

    var pluginName = 'numberReel';


    $.fn[pluginName] = function(options) {

         // var opts = $.extend( {}, $.fn[pluginName].defaults, options );

          
         return this.each(function() {

           
             
            var obj;
              if (!(obj = $.data(this, pluginName))) {
                var  $this = $(this)
                  ,data = $this.data()
                  ,opts =  $.extend( {}, $.fn[pluginName].defaults, options, data);
                
                $.data(this, pluginName, obj);
              }

            var  $this = $(this)
                ,html = $this.html()
                ,numbers = html.split('');
         
            Array.prototype.shuffle = function() {
                var i = this.length, j, temp;
                if ( i == 0 ) return this;
                while ( --i ) {
                   j = Math.floor( Math.random() * ( i + 1 ) );
                   temp = this[i];
                   this[i] = this[j];
                   this[j] = temp;
                }
                return this;
              }
              

           
            
              var reelArr = [];
              for (var i = 0; i < opts.reelFace; i++) {
                reelArr.push('<div>' + [i] + '</div>');
              };

              var reelHTML = $('<div class="' + opts.wrapper + '">');

           		if (opts.infinite === true) {
           			reelHTML.addClass('infinite');
           		}
                $.each(numbers, function(key, number) {
                    if (key % 2 === 0) {
                        var altClass = ''
                    } else {
                        var altClass = '-alt'
                    }
                    
                    var reelTmp = '';
                  
                    var reelTmp = $('<div class="reel' + altClass + '"><div>' + number + '</div>' +  reelArr.shuffle().join("") + '</div>');
                    reelHTML.append(reelTmp);


                   reelTmp.wrap('<div class="reel-wrapper">');

                });

                if (opts.thousands === true) {
                      var el = reelHTML.find('.reel-wrapper');
                      var x = el.length;
                      var wrapper = '<div class="reel-seperator">';
                     
                      
                      if (x  > 3) {

                        for(var i = 0; i < el.length; i+=3) {
                          if (i=== 0){
                            el.slice(-3).wrapAll(wrapper);
                            el.slice(-(6),-(3)).wrapAll(wrapper);
                          } else {
                            el.slice(-(6+i),-(3+i)).wrapAll(wrapper);
                          }
                          
                        }
                       
                      } 

                    
                    }

              if (opts.currency != '') {
                 if (opts.thousands === true) {
                    reelHTML.prepend('<div class="reel-seperator">' + opts.currency + '</div>')
                  } else {
                    reelHTML.prepend('<div class="reel-wrapper">' + opts.currency + '</div>')
                  }
              }

              $this.html(reelHTML);

                

         });

    };


     
    
    // Plugin defaults added as a property on our plugin function.
    $.fn[pluginName].defaults = {
        wrapper: 'number-reel'
        , infinite: false
        , thousands: false
        , currency: ''
        , reelFace: 9  //must be a positive integer 9
    };


    $(function() {
        $('[data-trigger="' + [pluginName] + '"]')[pluginName]();
    });
})(jQuery);
