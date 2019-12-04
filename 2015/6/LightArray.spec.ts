import { LightArray } from './LightArray';
import { Instruction } from './Instruction';
import { Bounds } from '../../shared/grid';

test('Light array starts empty', () => {
  expect((new LightArray()).onCount()).toBe(0);
});

test('Turn on 1 row of lights', () => {
  const la = new LightArray();
  la.instruct(new Instruction('turn on', new Bounds({x: 0, y: 0}, {x: 999, y: 0})));
  expect(la.onCount()).toBe(1000);
});

test('Turn on 1 row of lights, toggle 1 column', () => {
  const la = new LightArray();
  la.instruct(new Instruction('turn on', new Bounds({x: 0, y: 0}, {x: 999, y: 0})));
  la.instruct(new Instruction('toggle', new Bounds({x: 1, y: 0}, {x: 1, y: 999})));
  expect(la.onCount()).toBe(1998);
});

test('Turn on 1 row and column of lights', () => {
  const la = new LightArray();
  la.instruct(new Instruction('turn on', new Bounds({x: 0, y: 0}, {x: 999, y: 0})));
  la.instruct(new Instruction('turn on', new Bounds({x: 1, y: 0}, {x: 1, y: 999})));
  expect(la.onCount()).toBe(1999);
});

