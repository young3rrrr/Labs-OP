const Mode = {
    HIGHEST: 'highest',
    LOWEST: 'lowest',
    OLDEST: 'oldest',
    NEWEST: 'newest'
}

class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.isDeleted = false;
    }


}


class BiDirectionalPriorityQueue {
    constructor(){
        this.chronology = [];
        this.byPriority = [];
    }
}

enqueue(item, priority) {
    const node = new Node(item, priority);
    this.chronology.push(node);
    this.byPriority.push(node);
    this.byPriority.sort((a, b) => b.priority - a.priority);
}