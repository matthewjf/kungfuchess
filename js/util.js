var Util = {};

Util.inherits = function (subclass, parentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = parentClass.prototype;
  subclass.prototype = new Surrogate();
  subclass.prototype.constructor = subclass;
};


Util.posEquals = function (pos1, pos2) {
  if (!pos1 || !pos2) {
    return false;
  }
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

Util.includesPos = function(pos, array) {
  for (var i = 0; i < array.length; i++) {
    if (this.posEquals(pos, array[i]))
      return true;
  }

  return false;
};


module.exports = Util;
