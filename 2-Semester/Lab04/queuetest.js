import { BiDirectionalPriorityQueue, Mode } from "./queue.js";

const queue = new BiDirectionalPriorityQueue();

queue.enqueue("Task A", 10);
queue.enqueue("Task B", 20);
queue.enqueue("Task C", 30);
queue.enqueue("Task D", 40);


console.log(queue.peek(Mode.HIGHEST)); // Task D
console.log(queue.peek(Mode.LOWEST));  // Task A
console.log(queue.peek(Mode.OLDEST));  // Task A
console.log(queue.peek(Mode.NEWEST));  // Task D

console.log(queue.dequeue(Mode.HIGHEST)); // Task D
console.log(queue.peek(Mode.HIGHEST)); // Task C

console.log(queue.dequeue(Mode.OLDEST)); // Task A
console.log(queue.peek(Mode.OLDEST));  // Task B