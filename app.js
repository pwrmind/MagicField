(function (observersSelector, hendler) {
    var observer;
    var properties;
    var rawProperties;
    var property;
    var observable;
    var event;
    var observers = document.querySelectorAll(observersSelector);

    var getObserverProperties = function (rawProperties) {
        var properties = {};
        var property;

        for(var j = 0; j < rawProperties.length; j++) {
            property = rawProperties[j].trim().split(":");
            if(property[0] === "events") {
                properties[property[0]] = property[1].trim().split(",");
            } else {
                properties[property[0]] = property[1];
            }
        }

        return properties;
    };

    for(var i = 0; i < observers.length; i++) {
        observer = observers[i];
        properties = getObserverProperties(observer.getAttribute("data-observer").split(";")) || {};

        observable = document.querySelector(properties.observable);
        observable.subscribers = observable.subscribers || [];

        observable.addSubscriber = observable.addSubscriber || function(subscriber) {
            var self = this;
            self.subscribers.push(subscriber);
        };

        observable.notifySubscribers = observable.notifySubscribers || function(sender) {
            var self = this;
            self.subscribers.forEach(function(subscriber) {
                hendler(subscriber, self);
            });
        };

        for(var k = 0; k < properties.events.length; k++) {
            event = properties.events[k].trim();
            observable.addEventListener(event, observable.notifySubscribers);
            observable.addSubscriber(observer);
        }
    }
})("[data-observer]", function(observer, observable, eventProperties){
    if(observer.tagName == 'INPUT' || observer.tagName == 'SELECT'){
        observer.value = observable.value;
    } else {
        observer.innerText = observable.value;
    }
});

