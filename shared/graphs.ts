export class GraphNode<T> {
  constructor(readonly state: T) {}
  private neighborList: Set<GraphNode<T>> = new Set();

  addNeighbor(neighbor: GraphNode<T>): this {
    if(this.neighborList.has(neighbor)) {
      return this;
    }
    this.neighborList.add(neighbor);
    neighbor.addNeighbor(this);
    return this;
  }

  get neighbors(): Iterable<GraphNode<T>> {
    return this.neighborList;
  }
}

export class Graph<T> {
  private nodes: Map<T, GraphNode<T>> = new Map();

  add(value: T | GraphNode<T>): GraphNode<T> {
    const node = value instanceof GraphNode ? value : new GraphNode(value);
    if (this.nodes.has(node.state)) {
      throw new Error(`This graph already has a node for ${node.state}`);
    }
    this.nodes.set(node.state, node);
    return node;
  }

  set(value: T | GraphNode<T>): GraphNode<T> {
    const node = value instanceof GraphNode ? value : new GraphNode(value);
    this.nodes.set(node.state, node);
    return node;
  }

  get(state: T): GraphNode<T> | undefined {
    return this.nodes.get(state);
  }

  has(state: T): boolean {
    return this.nodes.has(state);
  }

  link(a: T, b: T): [GraphNode<T>, GraphNode<T>] {
    const nodeA = this.get(a) ?? this.add(a);
    const nodeB = this.get(b) ?? this.add(b);
    nodeA.addNeighbor(nodeB);
    return [nodeA, nodeB];
  }
}
