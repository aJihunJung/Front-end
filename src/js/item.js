// item.js
(function (window) {
  'use strict';

  window.AbItem = window.AbItem || {};

  window.AbItem.changeItem = function (className) {
    var i = 0,
        el = null,
        node = null,
        doc = window.document,
        myItems = doc.getElementById('myItems'),
        childNodes = myItems.children,
        len = myItems.childElementCount,
        fragment = doc.createDocumentFragment();

    for ( i = 0; i < len; i += 1 ) {
      node = childNodes[i];
      if ( node.getAttribute('class') === className ) {
        el = document.createElement("li");
        el.setAttribute('class', className);
        el.innerHTML = className + " / "  + node.innerHTML;
        fragment.appendChild(el);
      }
    }

    myItems.innerHTML = "";
    myItems.appendChild(fragment);
  };

}(this));
