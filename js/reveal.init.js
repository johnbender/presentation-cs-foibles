Reveal.initialize({
	transition: "concave",
	history: true,
	progress: true,
  dependencies: [
    // Interpret Markdown in <section> elements
    { src: 'js/plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    // Syntax highlight for <code> elements
    { src: 'js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    // Speaker notes
    { src: 'js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
  ]
});