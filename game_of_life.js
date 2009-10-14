function GameOfLife(cols,rows) {

  this.cells = new Array(rows*cols);

  this.reset = function() {
    for (var offset = cells.length; offset > 0; offset--) {
      //random on/off
      cells[offset] = (Math.random()*2 > 1.0);
    }
  }

  // Returns whether the cell is alive or dead. 
  // The cells outside the grid boundaries are currently dead.
  this.cell = function(row,col) {
    return (row >= 0 && row < rows && 
            col >= 0 && col < cols && 
            cells[row * cols + col]);
  }

  // Advances the simulation one generation.
  this.step = function() {
    var next = new Array(rows * cols);
    var changed = false;
    for (var row = rows; row > 0; row--) {
      var row_offset = row * cols;
      for (var col = cols; col > 0; col--) {
        var count = 0;
        if (cell(row - 1, col - 1)) count++;
        if (cell(row - 1, col)) count++;
        if (cell(row - 1, col + 1)) count++;
        if (cell(row, col - 1)) count++;
        if (cell(row, col + 1)) count++;
        if (cell(row + 1, col - 1)) count++;
        if (cell(row + 1, col)) count++;
        if (cell(row + 1, col + 1)) count++;

        var old_state = cells[row_offset + col];
        var new_state = (!old_state && count == 3) || 
            (old_state && (count == 2 || count == 3));

        if (!changed && new_state != old_state) changed = true;

        next[row_offset + col] = new_state;
      }
    }
    cells = next;
    return changed;
  }

  // Draws the current simulation generation onto a Canvas surface
  this.draw = function(canvas) {
    var context = canvas.getContext('2d');

    var width = Math.floor(canvas.width / cols);
    var height = Math.floor(canvas.height / rows);

    // clear the entire canvas
    context.fillStyle = 'red';
    context.fillRect(0, 0, cols * width, rows * height);

    // draw living cells
    context.fillStyle = 'yellow';
    for (var row = rows; row > 0; row--) {
      var row_offset = row * cols;
      for (var col = cols; col > 0; col--) {
        if (cells[row_offset + col]) {
          context.fillRect(col * width, row * height, width, height);
        }
      }
    }
  }

  reset();
  return this;
}
