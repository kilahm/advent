export class SIFImage {
  private readonly layers: SIFLayer[];

  constructor(
    readonly width: number,
    readonly height: number,
    private readonly rawData: number[]
  ) {
    const layerPixelCount = width * height;
    if (rawData.length % layerPixelCount !== 0) {
      throw new Error('SIF Image data does not fit into layers');
    }

    const layerCount = Math.floor(rawData.length / layerPixelCount);
    this.layers = Array.from({ length: layerCount }, (_, i) => {
      const startIndex = i * layerPixelCount;
      const endIndex = startIndex + layerPixelCount;
      return new SIFLayer(rawData.slice(startIndex, endIndex));
    });
  }

  signature(): number {
    let sigLayer = this.layers[0];
    let sigLayerCount = this.layers[0].valueCount(0);
    for (let i = 1; i < this.layers.length; i++) {
      if (this.layers[i].valueCount(0) < sigLayerCount) {
        sigLayer = this.layers[i];
        sigLayerCount = this.layers[i].valueCount(0);
      }
    }
    return sigLayer.valueCount(1) * sigLayer.valueCount(2);
  }

  render(): string {
    const flatData = Array.from(
      { length: this.layers[0].rawData.length },
      (_, i) => {
        return this.layers.map(l => l.rawData[i]).find(v => v !== 2);
      }
    );
    return Array.from({ length: Math.floor(flatData.length / this.width) }, (_, i) => {
      const startIndex = i * this.width;
      const endIndex = startIndex + this.width;
      return flatData.slice(startIndex, endIndex).map(v => v === 0 ? ' ' : 'O').join('');
    }).join('\n');
  }
}

class SIFLayer {
  constructor(readonly rawData: number[]) {
  }

  valueCount(value: number): number {
    return this.rawData.filter(v => v === value).length;
  }
}
