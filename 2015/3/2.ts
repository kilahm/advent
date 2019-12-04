import { answer } from '../../shared/answer';
import { PointCollection } from './PointCollection';
import { map } from './map';

answer(PointCollection.fromMap(map, 2).pointCount);

