import { answer } from '../../shared/answer';
import { Mapper } from './Mapper';
import { map } from './map';

answer((new Mapper(map)).finalFloor());
