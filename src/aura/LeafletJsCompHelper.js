({
    fetchcontacts : function(component, event, helper,map) {
        var action = component.get("c.fetch_cons");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.contacts",response.getReturnValue());
                var conts = component.get("v.contacts");
                setTimeout(function() {
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                                {
                                }).addTo(map);
                    
                    for(var i=0;i<conts.length;i++){
                        if(conts[i].Contact_Geolocation__Latitude__s != null && conts[i].Contact_Geolocation__Longitude__s!= null){
                            var lat = conts[i].Contact_Geolocation__Latitude__s;
                            var lon = conts[i].Contact_Geolocation__Longitude__s;
                            var popupText = '<article class="slds-card">'+
                                '<div class="slds-card__header slds-grid">'+
                                '<header class="slds-media slds-media_center slds-has-flexi-truncate">'+
                                '<div class="slds-media__body">'+
                                '<h2>'+
                                '<span class="slds-text-heading_small">'+conts[i].Name+'<span>'+
                                '</h2>'+
                                '</div>'+
                                '</header>'+
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
                            marker.on('mouseover', function (e) {
                                this.openPopup();
                            });
                            marker.on('mouseout', function (e) {
                                this.closePopup();
                            });
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
    },
    createcontacts : function(component, event, helper,map,lat_lng) {
        L.circle(lat_lng, {radius: 50}).addTo(map);
        
        var r = confirm("Do you wish to create a contact here?");
        if (r == true) { 
            /*var action2 = component.get("c.create_cons");
            action2.setParams({
                lat_val: lat_lng.lat,
                long_val: lat_lng.lng
            });
            
            action2.setCallback(this, function(response) {
                var state = response.getState();
                console.log(response.getReturnValue());
                if (state === "SUCCESS") {
                    window.location.reload();
                    //$A.get('e.force:refreshView').fire();
                    
                }
            });
            $A.enqueueAction(action2);*/
            var createContactEvent = $A.get("e.force:createRecord");
            createContactEvent.setParams({
                "entityApiName": "Contact",
                "defaultFieldValues": {
                    'Contact_Geolocation__Latitude__s' : lat_lng.lat,
                    'Contact_Geolocation__Longitude__s' : lat_lng.lng
                }
            });
            createContactEvent.fire();
        }
        else {
        }
    }
})