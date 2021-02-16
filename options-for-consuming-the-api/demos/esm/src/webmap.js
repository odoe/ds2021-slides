import ArcGISMap from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';

export function initMap(id, container) {
    const layer = new FeatureLayer({
        portalItem: { id }
    });

    const map = new ArcGISMap({
        basemap: 'dark-gray-vector',
        layers: [layer]
    });

    const view = new MapView({
        container,
        map
    });

    view.when(async () => {
        await layer.when();
        view.extent = layer.fullExtent;
    });
}