import { type SkyLayer, sameLayer } from './layer';

/** Keeps asynchronous completions from changing a newer selection or an unmounted viewer. */
export class LayerRequest<T> {
  private generation = 0;

  constructor(private readonly handlers: {
    requested: () => SkyLayer;
    revision: () => number;
    load: (layer: SkyLayer) => Promise<T>;
    loading: () => void;
    commit: (asset: T, layer: SkyLayer) => void;
    error: (error: unknown) => void;
  }) {}

  request(layer: SkyLayer): void {
    const generation = ++this.generation;
    const revision = this.handlers.revision();
    const current = () => generation === this.generation && revision === this.handlers.revision() && sameLayer(layer, this.handlers.requested());
    this.handlers.loading();
    void this.handlers.load(layer).then((asset) => {
      if (current()) this.handlers.commit(asset, layer);
    }).catch((error: unknown) => {
      if (current()) this.handlers.error(error);
    });
  }

  cancel(): void {
    this.generation++;
  }
}
