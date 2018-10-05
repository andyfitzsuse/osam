var Ajax = {
  get: function(url, onsuccess, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (onsuccess) {
          onsuccess(xhr.responseText);
        }
      }
      else if (onerror) {
        onerror(xhr.status);
      }
    };
    xhr.open('GET', url);
    xhr.send();
  }
};

var getElementStyleString = function(sourceEl, cloneEl) {
  var sourceStyle = getComputedStyle(sourceEl);
  var cloneStyle = getComputedStyle(cloneEl);
  var styleString = sourceEl.style.cssText;
  for (var i in sourceStyle) {
    var key = sourceStyle[i];
    var sourceValue = sourceStyle.getPropertyValue(key);
    var cloneValue = cloneStyle.getPropertyValue(key);
    if (key && sourceValue && sourceValue !== cloneValue) {
      styleString += key + ":" + sourceValue + ";";
    }
  }
  
  return styleString;
};

var serializeSvg = function(sourceSvgElement, width, height) {
  var svgClone = sourceSvgElement.cloneNode(true);
  if (width) {
    svgClone.setAttribute('width', width);
  }
  if (height) {
    svgClone.setAttribute('height', height);
  }
  
  document.body.appendChild(svgClone);
  svgClone.style.cssText = getElementStyleString(sourceSvgElement, svgClone);
  
  var sourceChildren = sourceSvgElement.querySelectorAll('*');
  var cloneChildren = svgClone.querySelectorAll('*');
  for (var i = 0; i < sourceChildren.length; i++) {
    var sourceNode = sourceChildren[i];
    var cloneNode = cloneChildren[i];
    if (cloneNode.style) {
      cloneNode.style.cssText = getElementStyleString(sourceNode, cloneNode);
    }
  }
  
  svgClone.remove();
  return new XMLSerializer().serializeToString(svgClone);
};

var createHyperlink = function(url, text) {
  var a = document.createElement('a');
  a.href = url;
  a.innerText = text;
  
  return a;
};

// Making the buttons
var createImgDownloadButton = function(onclickPng, onclickSvg) {
  var container = document.createElement('span');
  container.className = 'download-container';
  
  var pngButton = createHyperlink('#', 'PNG');
  pngButton.className = 'download-link';
  if (onclickPng) {
    pngButton.onclick = onclickPng;
  }
  
  var svgButton = createHyperlink('#', 'SVG');
  svgButton.className = 'download-link';
  if (onclickSvg) {
    svgButton.onclick = onclickSvg;
  }
  
  container.appendChild(pngButton);
  container.appendChild(svgButton);
  
  return container;
};

var getTargetSizeFromClientRect = function(clientRect, maxWidth, maxHeight) {
  var sourceWidth = clientRect.width;
  var sourceHeight = clientRect.height;
  var ratioW = maxWidth / sourceWidth;
  var ratioH = maxHeight / sourceHeight;
  var ratio = Math.min(ratioW, ratioH);
  
  return {
    width: (sourceWidth * ratio),
    height: (sourceHeight * ratio)
  };
};


// PNG SERIALIZER
var onDownloadPngClick = function(svg) {
  return function(e) {
    var canvas = document.createElement('canvas');
    var targetSize = getTargetSizeFromClientRect(svg.getBoundingClientRect(), 512, 512);
    canvas.width = targetSize.width;
    canvas.height = targetSize.height;
    var data = serializeSvg(svg, targetSize.width + 'px', targetSize.height + 'px');
    var win = window.URL || window.webkitURL || window;
    var img = new Image();
    var blob = new Blob([data], { type: 'image/svg+xml' });
    var url = win.createObjectURL(blob);
    img.onload = function() {
      canvas.getContext('2d').drawImage(img, 0, 0);
      var uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
      
      var a = createHyperlink(uri);
      document.body.appendChild(a);
      a.style = 'display: none';
      a.download = (svg.id || 'original-filename') + '.png';
      a.click();

      window.URL.revokeObjectURL(uri);
      document.body.removeChild(a);
      canvas.remove();
      img.remove();
    };
    img.src = url;
  };
};


// SVG COMPILER
var onDownloadSvgClick = function(svg) {
  return function(e) {
    var targetSize = getTargetSizeFromClientRect(svg.getBoundingClientRect(), 512, 512);
    var data = serializeSvg(svg, targetSize.width + 'px', targetSize.height + 'px');
    var win = window.URL || window.webkitURL || window;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var blob = new Blob([preface, data], { type: 'image/svg+xml;charset=utf-8' });
    var url = win.createObjectURL(blob);
    e.target.href = url;
    e.target.download = (svg.id || 'original-filename') + '.svg';
  };
};




//  this takes all <img src=".svg"> 
//  and makes it inline <svg ...</svg> 
//  so that custom CSS can be applied

var onImgSvgDownloaded = function(img) {
  return function(data) {
    var divElement = document.createElement('div');
    divElement.innerHTML = data;
    var parser = new DOMParser();
    var doc = parser.parseFromString(data, 'image/svg+xml');
    var svg = doc.querySelector('svg');    
    img.parentNode.replaceChild(svg, img);
    
    var imgDownloadButton = createImgDownloadButton(onDownloadPngClick(svg), onDownloadSvgClick(svg));
    svg.parentNode.insertBefore(imgDownloadButton, svg.nextSibling);
  };
};
var svgImages = document.querySelectorAll('[src$=".svg"]');
for (var i = 0; i < svgImages.length; i++) {
  var img = svgImages[i];
  var imgUrl = img.getAttribute('src');
  Ajax.get(imgUrl, onImgSvgDownloaded(img));
}
