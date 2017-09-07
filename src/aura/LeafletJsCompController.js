({
    jsLoaded: function(component, event, helper) {
        var map = L.map('map', {zoomControl: true}).setView([51.5056,-0.1213], 15);
        helper.fetchcontacts(component, event, helper,map);
        map.on('click', $A.getCallback(function(e) {
            var lat_long_val =  e.latlng;
            helper.createcontacts(component, event, helper,map,lat_long_val);
        }));
    }  
})