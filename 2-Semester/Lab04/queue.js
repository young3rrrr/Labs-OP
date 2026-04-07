


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

enqueue(item, priority) {
    const node = new Node(item, priority);
    this.chronology.push(node);
    this.byPriority.push(node);
    this.byPriority.sort((a, b) => b.priority - a.priority);
}

dequeue(mode) {
    switch (mode) {
        case Mode.HIGHEST:
            while (this.byPriority.length > 0 && this.byPriority[0].isDeleted) {
                this.byPriority.shift();
            }
            if (this.byPriority.length === 0) return null;
            const highestNode = this.byPriority.shift();
            highestNode.isDeleted = true;
            return highestNode.data;

        case Mode.LOWEST:
            while (this.byPriority.length > 0 && this.byPriority[this.byPriority.length - 1].isDeleted) {
                this.byPriority.pop();
            }
            if (this.byPriority.length === 0) return null;
            
            const lowestNode = this.byPriority.pop();
            lowestNode.isDeleted = true;
            return lowestNode.data;

        case Mode.OLDEST:
            while (this.chronology.length > 0 && this.chronology[0].isDeleted) {
                this.chronology.shift();
            }
            if (this.chronology.length === 0) return null;
            
            const oldestNode = this.chronology.shift();
            oldestNode.isDeleted = true;
            return oldestNode.data;

        case Mode.NEWEST:
            while (this.chronology.length > 0 && this.chronology[this.chronology.length - 1].isDeleted) {
                this.chronology.pop();
            }
            if (this.chronology.length === 0) return null;
            
            const newestNode = this.chronology.pop();
            newestNode.isDeleted = true;
            return newestNode.data;

        default:
            throw new Error("Invalid mode");
    }
}

peek(mode) {
    switch (mode) {
        case Mode.HIGHEST:
            while (this.byPriority.length > 0 && this.byPriority[0].isDeleted) {
                this.byPriority.shift();
            }
            return this.byPriority.length > 0 ? this.byPriority[0].data : null;

        case Mode.LOWEST:
            while (this.byPriority.length > 0 && this.byPriority[this.byPriority.length - 1].isDeleted) {
                this.byPriority.pop();
            }
            return this.byPriority.length > 0 ? this.byPriority[this.byPriority.length - 1].data : null;

        case Mode.OLDEST:
            while (this.chronology.length > 0 && this.chronology[0].isDeleted) {
                this.chronology.shift();
            }
            return this.chronology.length > 0 ? this.chronology[0].data : null;

        case Mode.NEWEST:
            while (this.chronology.length > 0 && this.chronology[this.chronology.length - 1].isDeleted) {
                this.chronology.pop();
            }
            return this.chronology.length > 0 ? this.chronology[this.chronology.length - 1].data : null;

        default:
            throw new Error("Invalid mode");
    }

}
}


export { BiDirectionalPriorityQueue, Mode };