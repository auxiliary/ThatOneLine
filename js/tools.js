Tools = {
    // MIT http://rem.mit-license.org
    trim: function(c) {
      var ctx = c.getContext('2d'),
        copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
          top: null,
          left: null,
          right: null,
          bottom: null
        },
        x, y;

      for (i = 0; i < l; i += 4) {
        // Trim transparent space
        //if (pixels.data[i+3] !== 0) {

        // Trim whitespace 
        if (!(pixels.data[i] == 255 && pixels.data[i+1] == 255 && pixels.data[i+2] == 255)){
          x = (i / 4) % c.width;
          y = ~~((i / 4) / c.width);
      
          if (bound.top === null) {
            bound.top = y;
          }
          
          if (bound.left === null) {
            bound.left = x; 
          } else if (x < bound.left) {
            bound.left = x;
          }
          
          if (bound.right === null) {
            bound.right = x; 
          } else if (bound.right < x) {
            bound.right = x;
          }
          
          if (bound.bottom === null) {
            bound.bottom = y;
          } else if (bound.bottom < y) {
            bound.bottom = y;
          }
        }
      }
        
      var trimHeight = bound.bottom - bound.top,
          trimWidth = bound.right - bound.left,
          trimmed = ctx.getImageData(bound.left, bound.top, trimWidth + 5, trimHeight + 5);
      
      copy.canvas.width = trimWidth + 10;
      copy.canvas.height = trimHeight + 30;

      // Let's fill the extra space with white
      copy.fillStyle = "#ffffff";
      copy.fillRect(0, 0, trimWidth + 10, trimHeight + 30);

      copy.putImageData(trimmed, 5, 5);

      copy.fillStyle = "#bbbbbb";
      copy.font = "8px Calibri";
      copy.fillText("Made using ThatOneLine.com", 5, trimHeight + 25);
      
      // open new window with trimmed image:
      return copy.canvas;
    }
};
