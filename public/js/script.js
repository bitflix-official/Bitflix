$(document).ready(function(){
  $('#search').focusin(function(){
    $('#searchIcon').css('color', 'var(--blue)');
  });
  $('#search').focusout(function(){
    $('#searchIcon').css('color', '#585858');
  });
});
filterSelection("all")
    function filterSelection(c) {
      var x, i;
      x = document.getElementsByClassName("filterDiv");
      elem = document.getElementById("current");
      elem.innerText = c.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      if (c == "all") c = "";
      for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
      }
    }

    function AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
      }
    }

    function RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }

    // Add active class to the current button (highlight it)
    var btnContainer = document.getElementById("btn-container");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("btn-primary");
        current[0].className = current[0].className.replace(" btn-primary", "");
        this.className += " btn-primary";
      });
    }

    $(document).ready(function(){
      $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#search-ul li").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
