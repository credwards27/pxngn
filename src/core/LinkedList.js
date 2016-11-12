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
    destroy() {}
    
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
    }
    
    /* Removes the first node from the list and returns its data. Similar to
        Array.prototype.shift(), the first node is removed.
        
        Returns the removed node's data, or null if the list was empty when
        called. NOTE: This will also return null if the first in the list's data
        is null.
    */
    shift() {
    }
    
    /* Removes a node from the list and destroys it.
        
        node - Node to be removed.
        
        Returns true if the node was removed, or false if the node was not
        removed.
    */
    removeNode(node) {
    }
    
    /* Gets the first node in the list.
        
        Returns the first node, or null if the list is empty.
    */
    getFirst() {
    }
    
    /* Gets the last node in the list.
        
        Returns the last node, or null if the list is empty.
    */
    getLast() {
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
    }
    
    /* Iterates through the list in reverse.
        
        callback - See LinkedList::each().
        thisArg - See LinkedList::each().
        
        Returns the list.
    */
    eachReverse(callback, thisArg) {
    }
    
    /* Reverses the list.
        
        Returns the list.
    */
    reverse() {
    }
    
    /* Checks if the list is reversed.
        
        Returns true if the list is reversed, false otherwise.
    */
    isReversed() {
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
    }
}
