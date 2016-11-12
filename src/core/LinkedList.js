/* LinkedList.js
    
    Doubly linked, reversible list data structure.
*/

/* Doubly linked list data structure.
*/
export default class LinkedList {
    //
    // STATIC PROPERTIES
    //
    
    //
    // PROPERTIES
    //
    
    // Head node.
    _head = {
        0: null,
        1: null
    };
    
    // Tail node.
    _tail = {
        0: null,
        1: null
    };
    
    // Next node index.
    _next = 1;
    
    // Previous node index.
    _prev = 0;
    
    /* Constructor for LinkedList.
        
        ...data - One or more items to be added on instantiation.
    */
    constructor(...data) {
        // Connect head and tail nodes by default
        this._head[this._next] = this._tail;
        this._tail[this._prev] = this._head;
        
        // Add provided data
        if (data.length) {
            for (var i=0, l=data.length; i<l; ++i) {
                this.append(data[i]);
            }
        }
    }
    
    /* Destructor for LinkedList.
    */
    destroy() {
        this.each(function(d, n) {
            this.removeNode(n);
        }, this);
        
        this._head[0] = null;
        this._head[1] = null;
        this._tail[0] = null;
        this._tail[1] = null;
        
        this._head = null;
        this._tail = null;
    }
    
    //
    // STATIC METHODS
    //
    
    //
    // METHODS
    //
    
    /* Appends an item to the end of the list.
        
        data - Data to append to the list.
        
        Returns the new node, or null if no node was added.
    */
    append(data) {
        return this.insertBefore(data, this._tail);
    }
    
    /* Prepends an item to the beginning of the list.
        
        data - Data to prepend to the list.
        
        Returns the new node, or null if no node was added.
    */
    prepend(data) {
        return this.insertAfter(data, this._head);
    }
    
    /* Inserts data after a given node.
        
        data - Data to insert.
        after - Existing node after which to insert data.
        
        Returns the new node, or null if no node was added.
    */
    insertAfter(data, after) {
        if (typeof after !== "object") { return null; }
        
        var next = this._next,
            prev = this._prev,
            tempNext = after[next];
        
        // Create new node
        data = { data: data };
        
        // Link new node
        data[next] = tempNext;
        data[prev] = after
        after[next] = data;
        tempNext[prev] = data;
        
        // Return new node
        return data;
    }
    
    /* Inserts data before a given node.
        
        data - Data to insert.
        before - Existing node before which to insert data.
        
        Returns the new node, or null if no node was added.
    */
    insertBefore(data, before) {
        if (typeof before !== "object") { return null; }
        return this.insertAfter(data, before[this._prev]);
    }
    
    /* Removes the last node from the list and returns its data. Similar to
        Array.prototype.pop(), the last node is removed.
        
        Returns the removed node's data, or null if the list was empty when
        called. NOTE: This will also return null if the last node in the list's
        data is null.
    */
    pop() {
        var node = this.getLast(),
            data = node ? node.data : null;
        
        this.removeNode(node);
        return data;
    }
    
    /* Removes the first node from the list and returns its data. Similar to
        Array.prototype.shift(), the first node is removed.
        
        Returns the removed node's data, or null if the list was empty when
        called. NOTE: This will also return null if the first in the list's data
        is null.
    */
    shift() {
        var node = this.getFirst(),
            data = node ? node.data : null;
        
        this.removeNode(node);
        return data;
    }
    
    /* Removes a node from the list and destroys it.
        
        node - Node to be removed.
        
        Returns true if the node was removed, or false if the node was not
        removed.
    */
    removeNode(node) {
        if (!node) { return false; }
        
        var next = this._next,
            prev = this._prev,
            nodeNext = node[next],
            nodePrev = node[prev];
        
        // Exit if the node is not connected to other nodes
        if (!nodeNext || !nodePrev) { return false; }
        
        // Remove node from the list
        nodeNext[prev] = nodePrev;
        nodePrev[next] = nodeNext;
        
        // Destroy node
        node[next] = null;
        node[prev] = null;
        node.data = null;
        
        return true;
    }
    
    /* Gets the first node in the list.
        
        Returns the first node, or null if the list is empty.
    */
    getFirst() {
        var node = this._head[this._next];
        return node !== this._tail ? node : null;
    }
    
    /* Gets the last node in the list.
        
        Returns the last node, or null if the list is empty.
    */
    getLast() {
        var node = this._tail[this._prev];
        return node !== this._head ? node : null;
    }
    
    /* Iterates through each node in the list.
        
        callback - Callback function to run on each iteration. Expects the
            following parameters:
                data - Data contained by the node at the current iteration.
                node - Node at the current iteration.
            
            Returning explicitly false from the callback will stop iteration.
            In addition to the node parameter, 'this' in the callback function
            refers to the node at the current iteration.
            
            Callbacks may remove nodes with removeNode() without affecting
            iteration, though doing so may cause problems if other iterations
            are running asynchronously.
        
        thisArg - Optional object to be used for 'this' in the callback instead
            of the current node.
        
        Returns the list.
    */
    each(callback, thisArg) {
        return this._iterate(callback, thisArg, this._head, this._tail,
            this._next);
    }
    
    /* Iterates through the list in reverse.
        
        callback - See LinkedList::each().
        thisArg - See LinkedList::each().
        
        Returns the list.
    */
    eachReverse(callback, thisArg) {
        return this._iterate(callback, thisArg, this._tail, this._head,
            this._prev);
    }
    
    /* Reverses the list.
        
        Returns the list.
    */
    reverse() {
        var next = this._next,
            prev = this._prev,
            tempHead = this._head,
            tempTail = this._tail;
        
        // Flip head and tail
        this._head = tempTail;
        this._tail = tempHead;
        
        // Flip directions
        this._next ^= 1;
        this._prev ^= 1;
        
        return this;
    }
    
    /* Checks if the list is reversed.
        
        Returns true if the list is reversed, false otherwise.
    */
    isReversed() {
        return 0 === this._next;
    }
    
    /* Iterates through the list with an arbitrary starting point, ending point,
        and direction.
        
        callback - See LinkedList::each().
        thisArg - See LinkedList::each().
        head - Head node for iteration. The first iteration will be the node
            after this one.
        tail - Tail node for iteration. The last iteration will be the node
            before this one.
        nextIndex - Index to use for the 'next' direction (0 or 1). The
            'previous' direction will be the opposite of this.
        
        Returns the list.
    */
    _iterate(callback, thisArg, head, tail, nextIndex) {
        if (typeof callback !== "function") {
            return this;
        }
        
        // Normalize parameters
        thisArg = undefined !== thisArg ? thisArg : false;
        nextIndex = nextIndex ? 1 : 0;
        
        var prevIndex = nextIndex ^ 1,
            prevNode = head,
            curr = prevNode[nextIndex];
        
        // Iterate
        while (tail !== curr && curr[nextIndex]) {
            prevNode = curr[prevIndex];
            
            // Run callback
            if (false === callback.call(thisArg || curr, curr.data, curr)) {
                break;
            }
            
            // Get node for next iteration (use previous node's pointer if
            // current node was removed in callback)
            curr = curr[nextIndex] || prevNode[nextIndex];
        }
        
        return this;
    }
}
