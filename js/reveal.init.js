Reveal.initialize({
	transition: "none",
	history: true,
	progress: true,
	controls: false,
  dependencies: [
    // Interpret Markdown in <section> elements
    { src: 'js/plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },

    { src: 'js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); }},

    // Syntax highlight for <code> elements
    {	src: 'js/plugin/highlight/highlight.js',
			async: true,
			callback: function() {
				// Replace `keyword` class with `this` class where appropriate
				window.addEventListener( "load", function() {
						var l, set;

					set = document.querySelectorAll( ".keyword" );
					l = set.length;

					while( l-- ) {
						if( set[l].innerHTML.indexOf( "this" ) === 0 ){
							set[l].setAttribute( "class", "this" );
						}
					}
				});
			}
		},

    // Speaker notes
    { src: 'js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },

    // load jquery and handle hilights
    { src: 'js/jquery-1.9.0.min.js', async: true, callback: function() {
        $(function() {
	          $( "code" ).each(function(){
		            $( ".sh_keyword:contains('this')" ).addClass( "this" );

		            $( "pre" ).html(function( i, string ) {
                    // the css requires that the parent be tagged with
                    // the hilighted class
                    if( string.match( /~~/ ) ){
                        $(this).parents( "section" ).addClass( "hilighted" );
                    }

                    // replace the hilight markers with spans
			              return string
				                .replace("~~", "<span class='hilight'>" )
				                .replace("/~~", "</span>" );
		            });
                hljs.initHighlighting();
	          });

            $( "section" ).each(function(i, elem) {
                var elem = $(elem), heading;

                if( elem.children( "h1, h2, h3" ).length === 0 ) {
                    var previousSiblings =  elem.prevAll(),
                    length = previousSiblings.length, i = 0;

                    while( i <= length ){
                        if( previousSiblings.eq(i).children("h1,h2,h3").length ) {
                            heading = previousSiblings.eq(i).find( "h1,h2,h3" );
                            break;
                        }
                        i++;
                    }

                }

                if(heading) {
                    elem.append("<div class='label-content'><h4>" + heading.text() + "</h4></div>" );
                }
            });

            function setSlideLabel() {
                var slide = Reveal.getCurrentSlide();
                $( "#label" ).html("");
                $( "#label" ).html( $( slide ).children(".label-content").html() );
            }

            setSlideLabel();
            Reveal.addEventListener( 'slidechanged', setSlideLabel );
        });
    }}
  ]
});
