import { XmasCypher } from './XmasCypher';

describe('XmasCypher', () => {
  it('should handle the small example', () => {
    const data = [
      35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299,
      277, 309, 576,
    ];
    const cypher = new XmasCypher(5);
    let result = 0;
    for(let index = 0; index < data.length; ++index) {
        if(!cypher.next(data[index])){
            result = data[index]
            break;
        }
    }
    expect(result).toBe(127);
  });
});
