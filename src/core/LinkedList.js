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
    */
    constructor() {
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
}
