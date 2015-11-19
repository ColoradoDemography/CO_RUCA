var map, featureList, citiesSearch = [];


$(window).resize(function() {
  sizeLayerControl();
});


$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});


function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}


/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);


  
/* Overlay Layers */

var cities = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: true,
      fillOpacity: 0,
      weight: 1,
      opacity: 1
    };
  },
  onEachFeature: function (feature, layer) {
    
    citiesSearch.push({
      name: layer.feature.properties.first_city,
      source: "Cities",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
    
    
    
        layer.on({
            mouseover: function (e){
          var feature = e.target;
            if (!L.Browser.ie && !L.Browser.opera) {
          feature.bringToFront();
        }
        feature.setStyle({
          fillOpacity: 0.5
        });

},
          mouseout: function (e){
         var feature = e.target;
        if (!L.Browser.ie && !L.Browser.opera) {
          feature.bringToFront();
        }
         feature.setStyle({
          fillOpacity: 0
        });
          },
          
        });
    
if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + 
          "<tr><th>City Name</th><td>" + feature.properties.first_city + "</td></tr>"
          "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("City");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    
  }
});
$.getJSON("data/cities.geojson", function (data) {
  cities.addData(data);
});

function clookup(geoid){

  var countyfips=geoid.substr(2, 3);
  
  switch(countyfips) {
    case '001':
        return 'Adams';
    case '003':
        return 'Alamosa';
    case '005':
        return 'Arapahoe';
    case '007':
        return 'Archuleta ';      
    case '009':
        return 'Baca';
    case '011':
        return 'Bent';      
    case '013':
        return 'Boulder';
    case '014':
        return 'Broomfield';      
    case '015':
        return 'Chaffee';
    case '017':
        return 'Cheyenne ';      
    case '019':
        return 'Clear Creek ';
    case '021':
        return 'Conejos';
    case '023':
        return 'Costilla';
    case '025':
        return 'Crowley';
    case '027':
        return 'Custer';
    case '029':
        return 'Delta';
    case '031':
        return 'Denver';
    case '033':
        return 'Dolores';
    case '035':
        return 'Douglas';
    case '037':
        return 'Eagle';
    case '039':
        return 'Elbert';
    case '041':
        return 'El Paso';
    case '043':
        return 'Fremont';
    case '045':
        return 'Garfield';
    case '047':
        return 'Gilpin';
    case '049':
        return 'Grand';
    case '051':
        return 'Gunnison';
    case '053':
        return 'Hinsdale';
    case '055':
        return 'Huerfano';
    case '057':
        return 'Jackson';      
    case '059':
        return 'Jefferson';
    case '061':
        return 'Kiowa';      
    case '063':
        return 'Kit Carson';
    case '065':
        return 'Lake';      
    case '067':
        return 'La Plata';
    case '069':
        return 'Larimer';      
    case '071':
        return 'Las Animas';
    case '073':
        return 'Lincoln';
    case '075':
        return 'Logan';
    case '077':
        return 'Mesa';
    case '079':
        return 'Mineral';
    case '081':
        return 'Moffat';
    case '083':
        return 'Montezuma';
    case '085':
        return 'Montrose';
    case '087':
        return 'Morgan';
    case '089':
        return 'Otero';
    case '091':
        return 'Ouray';
    case '093':
        return 'Park';
    case '095':
        return 'Phillips';
    case '097':
        return 'Pitkin';
    case '099':
        return 'Prowers';
    case '101':
        return 'Pueblo';
    case '103':
        return 'Rio Blanco';
    case '105':
        return 'Rio Grande';
    case '107':
        return 'Routt';
    case '109':
        return 'Saguache ';      
    case '111':
        return 'San Juan ';
    case '113':
        return 'San Miguel';      
    case '115':
        return 'Sedgwick';
    case '117':
        return 'Summit';      
    case '119':
        return 'Teller';
    case '121':
        return 'Washington';      
    case '123':
        return 'Weld';
    case '125':
        return 'Yuma';
    default:
      return 'broken';
      console.log('broken');
}

  
}

var ruca = L.geoJson(null, {
  filter: function (feature) {
    var optionnum=0;
    var optionstr = $('.filter').find(":selected").text();

    
    if(optionstr==="ALL (1 to 10)"){optionnum=1;}
    if(optionstr==="2+"){optionnum=2;}
    if(optionstr==="3+"){optionnum=3;}
    if(optionstr==="4+"){optionnum=4;}
    if(optionstr==="5+"){optionnum=5;}
    if(optionstr==="6+"){optionnum=6;}
    if(optionstr==="7+"){optionnum=7;}
    if(optionstr==="8+"){optionnum=8;}
    if(optionstr==="9+"){optionnum=9;}
    if(optionstr==="10"){optionnum=10;}    

        
    optionnum = 10; //delete this later
    
    console.log(optionnum);
  console.log(feature.properties.RUCA);
  
    if(optionnum>=feature.properties.RUCA){
      return true;
    }
    
},
  style: function (feature) {
    
    
    switch(feature.properties.RUCA) {
    case 10:
      return {
        fillColor: "#276419",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 9:
      return {
        fillColor: "#4d9221",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
      case 8:
      return {
        fillColor: "#7fbc41",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 7:
      return {
        fillColor: "#b8e186",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 6:
      return {
        fillColor: "#e6f5d0",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 5:
      return {
        fillColor: "#fde0ef",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };        
    case 4:
      return {
        fillColor: "#f1b6da",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 3:
      return {
        fillColor: "#de77ae",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 2:
      return {
        fillColor: "#c51b7d",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    case 1:
      return {
        fillColor: "#8e0152",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
    default:
      return {
        fillColor: "black",
        weight: 1,
        fillOpacity: 0.5,
        color: "#E0E0E0"        
      };
  
    }
    
  },
  onEachFeature: function (feature, layer) {
if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + 
          "<tr><th>County</th><td>" + clookup(feature.properties.GEOID) + "</td></tr>" + 
          "<tr><th>Primary RUCA Code</th><td>" + feature.properties.RUCA + "</td></tr>" + 
          "<tr><th>Secondary RUCA Code</th><td>" + feature.properties.S_RUCA + "</td></tr>" +       
          "<tr><th>Population 2010</th><td>" + feature.properties.POP2010 + "</td></tr>" + 
          "<tr><th>Area (SqMi)</th><td>" + feature.properties.AREAsqmi.toFixed(2) + "</td></tr>" + 
          "<tr><th>Density (Pop/SqMi)</th><td>" + feature.properties.PopPerSqMi.toFixed(2) + "</td></tr>" +           
          "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Census Tract " + feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
  }
});
$.getJSON("data/ruca.geojson", function (data) {
  ruca.addData(data);
});


map = L.map("map", {
  zoom: 10,
  center: [39.13, -105.37],
  layers: [mapquestOSM, ruca],
  zoomControl: false,
  attributionControl: false
});


/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Created by <a href='https://www.colorado.gov/pacific/dola/state-demography-office'>CO Demography Office</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": mapquestOSM,
  "Aerial Imagery": mapquestHYB
};

var groupedOverlays = {
  "Reference": {
    "Cities": cities
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

//filter control
    var filter = L.control({
        position: 'topleft'
    });


    //create or recreate legend
    filter.onAdd = function(map) {

        var div;

        //legend title
        div = L.DomUtil.create('div', 'filter');
        div.innerHTML = "<h5 style='color: black;'><b>Filter RUCA</b></h5>";
      
          var legtext = 
          "<select class='selectpicker'>" +
          "<option selected>ALL (1 to 10)</option>" +
          "<option>2+</option>" +           
          "<option>3+</option>" +            
          "<option>4+</option>" +    
          "<option>5+</option>" +
          "<option>6+</option>" +           
          "<option>7+</option>" +            
          "<option>8+</option>" +                  
          "<option>9+</option>" +
          "<option>10</option>" +          
          "</select>";
      
      div.innerHTML += legtext;
                 
      L.DomEvent.disableClickPropagation(div);
        return div;
    };


//legend control
    var legend = L.control({
        position: 'bottomleft'
    });


    //create or recreate legend
    legend.onAdd = function() {

        var div;

        //legend title
        div = L.DomUtil.create('div', 'info legend');

          var legtext = 
          "<span style='background:#8e0152;'></span>" +
          "<span style='background:#c51b7d;'></span>"+
          "<span style='background:#de77ae;'></span>"+
          "<span style='background:#f1b6da;'></span>"+
          "<span style='background:#fde0ef;'></span>" +
          "<span style='background:#e6f5d0;'></span>" +
          "<span style='background:#b8e186;'></span>"+
          "<span style='background:#7fbc41;'></span>"+
          "<span style='background:#4d9221;'></span>"+    
          "<span style='background:#276419;'></span>" +    
          "<label>1</label>"+
          "<label>2</label>"+
          "<label>3</label>"+
          "<label>4</label>"+
          "<label>5</label>"+
          "<label>6</label>"+
          "<label>7</label>"+
          "<label>8</label>"+
          "<label>9</label>"+
          "<label>10</label>";
      
//           var legtext = 
//           "<span style='background:black;'></span>" +
//           "<span style='background:black;'></span>"+
//           "<span style='background:black;'></span>"+
//           "<span style='background:black;'></span>"+
//           "<span style='background:black;'></span>" +
//           "<span style='background:black;'></span>" +
//           "<span style='background:black;'></span>"+
//           "<span style='background:black;'></span>"+
//           "<span style='background:black;'></span>"+    
//           "<span style='background:black;'></span>" +    
//           "<label>RUCA</label>"+
//           "<label></label>"+
//           "<label>Codes</label>"+
//           "<label></label>"+
//           "<label>1</label>"+
//           "<label></label>"+
//           "<label>to</label>"+
//           "<label></label>"+
//           "<label>10</label>"+
//           "<label></label>";
      
      div.innerHTML = legtext;
        
        return div;
    };

//filter.addTo(map);
           
legend.addTo(map);


$( ".filter" ).change(function() {
  console.log( "Handler for .change() called." );
  
  map.removeLayer(ruca);


ruca.addTo(map);
  
  
});

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});


/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to city bounds */
  map.fitBounds(cities.getBounds());


  var citiesBH = new Bloodhound({
    name: "Cities",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: citiesSearch,
    limit: 10
  });



  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  citiesBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Cities",
    displayKey: "name",
    source: citiesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Cities</h4>"
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Cities") {
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
