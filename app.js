(function (observersSelector) {
    var observer;
    var properties;
    var rawProperties;
    var property;
    var observable;
    var hendler;
    var event;
    var observers = document.querySelectorAll(observersSelector);

    hendler = function() {
        observer.innerText = observable.value;
    };

    for(var i = 0; i < observers.length; i++) {
        observer = observers[i];
        rawProperties = observer.getAttribute("data-observer").split(";");
        properties = {};
        for(var j = 0; j < rawProperties.length; j++) {
            property = rawProperties[j].trim().split(":");
            if(property[0] === "events") {
                properties[property[0]] = property[1].trim().split(",");
            } else {
                properties[property[0]] = property[1];
            }
        }
        console.log(properties);    
        observable = document.querySelector(properties.observable);
        console.log(observable);

        for(var k = 0; k < properties.events.length; k++) {
            event = properties.events[k].trim();
            observable.addEventListener(event, hendler);
        }
    }
})("[data-observer]");

