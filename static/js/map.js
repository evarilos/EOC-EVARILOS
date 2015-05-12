TKN.IPSN.map.xToLon = function (x) {
    return ( TKN.IPSN.map.config.mapDimensions.zeropoint.Lon  +( ( x * (Math.abs(TKN.IPSN.map.config.mapDimensions.zeropoint.Lon) + Math.abs(TKN.IPSN.map.config.mapDimensions.xMax.Lon)) ) / TKN.IPSN.map.config.mapDimensions.xDistance ) );
};

TKN.IPSN.map.yToLat = function (y) {
    return ( TKN.IPSN.map.config.mapDimensions.zeropoint.Lat + ( ( y * (Math.abs(TKN.IPSN.map.config.mapDimensions.zeropoint.Lat) + Math.abs(TKN.IPSN.map.config.mapDimensions.yMax.Lat)) ) / TKN.IPSN.map.config.mapDimensions.yDistance ) );
};

TKN.IPSN.map.pointsToDistance = function (x1, y1, x2, y2) {
    // lat and lon in radiant values
    var true_lat = TKN.IPSN.map.yToLat(y1) * Math.PI / 180;
    var true_lon = TKN.IPSN.map.xToLon(x1) * Math.PI / 180;
    var est_lat = TKN.IPSN.map.yToLat(y2) * Math.PI / 180;
    var est_lon = TKN.IPSN.map.xToLon(x2) * Math.PI / 180;
    var dist = 6378.388 * 1000 * Math.acos(Math.sin(true_lat) * Math.sin(est_lat) + Math.cos(true_lat) * Math.cos(est_lat) * Math.cos(est_lon - true_lon));
    return dist;
};

TKN.IPSN.map.drawPointMarker = function (x, y, label, animation) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(TKN.IPSN.map.yToLat(y),TKN.IPSN.map.xToLon(x)),
        map: TKN.IPSN.map.instance,
        title: label,
        animation: animation || google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', TKN.IPSN.map.markerCallback);
    return marker;
};

TKN.IPSN.map.drawErrorMarker = function (x, y) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(TKN.IPSN.map.yToLat(y),TKN.IPSN.map.xToLon(x)),
        map: TKN.IPSN.map.instance,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 3,
            fillColor: 'black',
            fillOpacity: .8,
            strokeColor: 'black',
            strokeOpacity: .8,
            strokeWeight: 1
        },
    });
    return marker;
};

TKN.IPSN.map.drawErroRadius = function (x, y, radius) {

    var marker = new google.maps.Circle({
        map: TKN.IPSN.map.instance,
        radius: radius,
        center: new google.maps.LatLng(TKN.IPSN.map.yToLat(y),TKN.IPSN.map.xToLon(x)),
        fillColor: 'lightblue',
        fillOpacity: 0.5,
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        draggable: false,    // Dragable
        editable: false      // Resizable
    });
    return marker;
};

// ImgMapType class
TKN.IPSN.map.ImgMapType = function (theme, backgroundColor) {
    this.name = this._theme = theme;
    this._backgroundColor = backgroundColor;
};

TKN.IPSN.map.ImgMapType.prototype.tileSize = new google.maps.Size(256, 256);
TKN.IPSN.map.ImgMapType.prototype.minZoom = 0;
TKN.IPSN.map.ImgMapType.prototype.maxZoom = 5;

TKN.IPSN.map.ImgMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
    var tilesCount = Math.pow(2, zoom);

    if (coord.x >= tilesCount || coord.x < 0 || coord.y >= tilesCount || coord.y < 0) {
        var div = ownerDocument.createElement('div');
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.backgroundColor = this._backgroundColor;
        return div;
    }

    var img = ownerDocument.createElement('IMG');
    img.width = this.tileSize.width;
    img.height = this.tileSize.height;
    img.src = TKN.IPSN.map.Utils.GetImageUrl(this._theme + '/tile_' + zoom + '_' + coord.x + '-' + coord.y + '.png');

    return img;
};

// Other
TKN.IPSN.map.Utils = TKN.IPSN.map.Utils || {};

TKN.IPSN.map.Utils.GetImageUrl = function (image) {
    return TKN.IPSN.map.config.mapURL + image;
};

TKN.IPSN.map.Utils.SetOpacity = function (obj, opacity /* 0 to 100 */ ) {
    obj.style.opacity = opacity / 100;
    obj.style.filter = 'alpha(opacity=' + opacity + ')';
};

// CONSTRUCTOR
TKN.IPSN.map.Map = function () {
    TKN.IPSN.map.instance = new google.maps.Map(document.getElementById(TKN.IPSN.map.config.containerId), {
        zoom: 2,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        panControl: false,
        center: new google.maps.LatLng(0, -75),
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: false
    });

    // Set custom tiles
    TKN.IPSN.map.instance.mapTypes.set('andels', new TKN.IPSN.map.ImgMapType('andels', '#FFF'));
    TKN.IPSN.map.instance.setMapTypeId('andels');
    
    // draw measurement points
    $.each(TKN.IPSN.map.config.measurementPoints, function (key, val) {

            TKN.IPSN.map.drawPointMarker(TKN.IPSN.map.config.measurementPoints[key].x, TKN.IPSN.map.config.measurementPoints[key].y, TKN.IPSN.map.config.measurementPoints[key].label); 
        
    });

};
