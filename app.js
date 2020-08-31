// COPY TO CLIPBOARD
// Attempts to use .execCommand('copy') on a created text field
// Falls back to a selectable alert if not supported
// Attempts to display status in Bootstrap tooltip
// ------------------------------------------------------------------------------

function fillWithLink() {
  var searchTerm = $(this).attr("data-name");
  var searchTermModified = searchTerm.replace(/\s/g, "+");
  var linkUrl =
    "https://www.walmart.com/search/?cat_id=0&facet=retailer%3AAmerican+Swag+Merch&query=" +
    searchTermModified;
  $("#linkDump").empty();
  var newLink = $("<a>");
  newLink.attr("href", linkUrl);
  newLink.text(linkUrl);
  $("#linkDump").append(newLink);
}

// =============================================================
function copyToClipboard(text, el) {
  var copyTest = document.queryCommandSupported("copy");
  var elOriginalText = el.attr("data-original-title");

  if (copyTest === true) {
    var copyTextArea = document.createElement("textarea");
    copyTextArea.value = text;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "Copied!" : "Whoops, not copied!";
      el.attr("data-original-title", msg).tooltip("show");
    } catch (err) {
      console.log("Oops, unable to copy");
    }
    document.body.removeChild(copyTextArea);
    el.attr("data-original-title", elOriginalText);
  } else {
    // Fallback if browser doesn't support .execCommand('copy')
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}

$(document).ready(function () {
  // Initialize
  // ---------------------------------------------------------------------

  // Tooltips
  // Requires Bootstrap 3 for functionality
  $(".js-tooltip").tooltip();

  // Copy to clipboard
  // Grab any text in the attribute 'data-copy' and pass it to the
  // copy function
  //-------------------------------------------------------------------------------------
  //this bit should pull the search term from the input box.
  $(".js-linkify").click(function (event) {
    event.preventDefault();
    var term = $("SearchInput").val().trim().replace(/\s/g, "+");
    fillWithLink(term);
  });
  $(".js-copy").click(function () {
    var text = $(this).attr("data-copy");
    var el = $(this);
    copyToClipboard(text, el);
  });
});
