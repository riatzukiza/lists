var M = require("monads");
exports.doubly = function (array)  {
  return new DoublyLinkedList(array);
};
function DoublyLinkedList(array)  {
  //this.table = table;
  var head = this.head = new DoublyLinkedElement(null,null,{});
  var current = head;
  var previous = head;
  this.length = array.length;
  array.forEach(function(element,i)  {
    console.log(current,i);
    current = current.insertAfter(element);
    previous = current;
    //current = current.next;
  });
  this.tail = current.next = new DoublyLinkedElement(null,current,null);
};
DoublyLinkedList.prototype = {
  get:function(i)  {
    return M.cond(this)
    .if(i<=(this.length-1)/2) (function(this)  {
      var current = this.head.next;
      for(var j = 0;j<i;j++)  {
        console.log(current);
        current = current.next;
      }
      return current;
    })
    .else(function(list)  {
      var current = this.tail.previous;
      for(var j = this.length-1;j>i;j--)  {
        console.log(current);
        current = current.previous;
      }
      return current;
    });
  },
  loop:function(fn)  {
  },
  insert:function(i,data)  {
    this.length++;
    return M.cond(this)
    .if(i == 0) (function()  {
      return this.head.insertAfter(data);
    })
    .else(function()  {
      return this.get(i-1).insertAfter(data);
    })
    .done();
  },
  remove:function(i)  {
    this.length--;
    return cond(this)
    .if(i == 0)(function() {
      return this.head.removeAfter();
    })
    .else(function()  {
      return this.get(i-1).removeAfter();
    })
    .done();
  },
  insertFirst:function(data)  {
    return this.head.insertAfter(data);
  },
  removeFirst:function()  {
    return this.head.removeAfter();
  },
  insertLast:function(data)  {
    return this.tail.insertBefore(data);
  },
  removeLast:function()  {
    return this.tail.removeBefore();
  },
  splice:function()  {
  },
  slice:function()  {
  },
};
//util.inherits(DoublyLinkedElement,SinglyLinkedElement);
global.createDoublyLinkedList = function(data)  {
  return new DoublyLinkedList(data);
}
function DoublyLinkedElement(data,previous,next)  {
  this.data = data;
  this.previous = previous;
  this.next = next;
}
DoublyLinkedElement.prototype = {
  insertAfter:function(data)  {
    var newNode = new DoublyLinkedElement(data,this,this.next);
    this.next.previous = newNode;
    this.next = newNode;
    return newNode;
  },
  insertBefore:function(data)  {
    var newNode = new DoublyLinkedElement(data,this.previous,this)
    this.previous.next = newNode;
    this.previous = newNode;
    return newNode;
  },
  removeAfter:function()  {
    var removedNode = this.next;
    this.next = this.next.next;
    this.next.previous = this;
    return removedNode;
  },
  removeBefore:function()  {
    var removedNode = this.previous;
    this.previous = this.previous.previous;
    this.previous.next = this;
    return removedNode;
  },
};
