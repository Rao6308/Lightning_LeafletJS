({
    doInit: function(component) {
        
    },
    jsLoaded: function(component, event, helper) {
        var action = component.get("c.serverEcho");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.contacts",response.getReturnValue());
                var conts = component.get("v.contacts");
                console.log(conts);
                setTimeout(function() {
                    var map = L.map('map', {zoomControl: true}).setView([51.5056,-0.1213], 15);
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                                {
                                }).addTo(map);
                    
                    for(var i=0;i<conts.length;i++){
                        if(conts[i].Longitude__Latitude__s != null && conts[i].Longitude__Longitude__s!= null){
                            var lon = conts[i].Longitude__Latitude__s;
                            var lat = conts[i].Longitude__Longitude__s;
                            var popupText = '<article class="slds-card">'+
                                '<div class="slds-card__header slds-grid">'+
                                '<header class="slds-media slds-media_center slds-has-flexi-truncate">'+
                                '<div class="slds-media__figure">'+
                                '<span class="slds-icon_container slds-icon-standard-contact" title="description of icon when needed">'+
                                '<svg class="slds-icon slds-icon_small" aria-hidden="true">'+
                                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#contact"></use>'+
                                '</svg>'+
                                '</span>'+
                                '</div>'+
                                '<div class="slds-media__body">'+
                                '<h2>'+
                                '<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="[object Object]">'+
                                '<span class="slds-text-heading_small">Card Header</span>'+
                                '</a>'+
                                '</h2>'+
                                '</div>'+
                                '</header>'+
                                '<div class="slds-no-flex">'+
                                '<button class="slds-button slds-button_neutral">New</button>'+
                                '</div>'+
                                '</div>'+
                                '<div class="slds-card__body">'+
                                '<table class="slds-table slds-table_bordered slds-no-row-hover slds-table_cell-buffer">'+
                                '<thead>'+
                                '<tr class="slds-text-title_caps">'+
                                '<th scope="col">'+
                                '<div class="slds-truncate" title="Name">Name</div>'+
                                '</th>'+
                                '<th scope="col">'+
                                '<div class="slds-truncate" title="Company">Company</div>'+
                                '</th>'+
                                '<th scope="col">'+
                                '<div class="slds-truncate" title="Title">Title</div>'+
                                '</th>'+
                                '<th scope="col">'+
                                '<div class="slds-truncate" title="Email">Email</div>'+
                                '</th>'+
                                '</tr>'+
                                '</thead>'+
                                '<tbody>'+
                                '<tr class="slds-hint-parent">'+
                                '<th scope="row">'+
                                '<div class="slds-truncate">'+conts[i].Name+'</div>'+
                                '</th>'+
                                '<td>'+
                                '<div class="slds-truncate">'+conts[i].Department+'</div>'+
                                '</td>'+
                                '<td>'+
                                '<div class="slds-truncate">'+conts[i].Title+'</div>'+
                                '</td>'+
                                '<td>'+
                                '<div class="slds-truncate">'+conts[i].Email+'</div>'+
                                '</td>'+
                                '</tr>'+
                                '</tbody>'+
                                '</table>'+
                                '<footer class="slds-card__footer"><a href="javascript:void(0);">View All <span'+ 'class="slds-assistive-text">entity type</span></a></footer>'+
                                '</article>';
                            var markerLocation = new L.LatLng(lat, lon);
                            var marker = new L.Marker(markerLocation);
                            map.addLayer(marker);
                            
                            // specify popup options 
                            var customOptions =
                                {
                                    'maxWidth': '500',
                                    'className' : 'custom',
                                }
                            
                            marker.bindPopup(popupText,customOptions);
                        }
                    }
                });
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
        
        
    }
})