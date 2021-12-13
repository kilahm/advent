import { join } from 'path';
import { map } from '../../2015/1/map';
import { answer } from '../../shared/answer';
import { Graph, GraphNode } from '../../shared/graphs';
import { loadInput } from '../../shared/input';

(async () => {
  const graph = new Graph<string>();
  (await loadInput(join(__dirname, 'input.txt'))).forEach((line) => {
    const [a, b] = line.split('-');
    graph.link(a, b);
  });

  const start = graph.get('start');
  if (start === undefined) {
    throw new Error('No start for this graph');
  }

  let paths: GraphNode<string>[][] = [[start]];
  const completePaths: GraphNode<string>[][] = [];
  while (paths.length > 0) {
    paths = paths.reduce((newPaths, path) => {
      const last = path[path.length - 1];
      if (last.state === 'end') {
        completePaths.push(path);
        return newPaths;
      }
      [...last.neighbors].forEach((neighbor) => {
        if (
          neighbor.state === 'start' ||
          (neighbor.state === neighbor.state.toLowerCase() &&
            path.includes(neighbor) &&
            hasRepeatedSmallCave(path))
        ) {
          return;
        }
        newPaths.push([...path, neighbor]);
      });
      return newPaths;
    }, [] as GraphNode<string>[][]);
  }

  answer(completePaths.length);
})().catch(console.error);

function hasRepeatedSmallCave(path: GraphNode<string>[]): boolean {
  const caves = new Set<string>();
  return path.some((n) => {
    if (n.state.toLowerCase() === n.state) {
      if (caves.has(n.state)) {
        return true;
      }
      caves.add(n.state);
    }
    return false;
  });
}
