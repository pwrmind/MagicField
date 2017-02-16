(function (observersSelector, scope) {
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
            if(rawProperties[j].length === 0)
                continue;

            property = rawProperties[j].trim().split(":");
            
            if(property[0] === "events") {
                properties[property[0]] = property[1].trim().split(",");
            } else if (property[0] === "hendler") {
                properties[property[0]] = scope[property[1].trim()];
            } else {
                properties[property[0]] = property[1].trim();
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
                var properties = getObserverProperties(subscriber.getAttribute("data-observer").split(";")) || {};
                if(properties.hendler) {
                    properties.hendler(self);
                } else {
                    if(subscriber.tagName == 'INPUT' || subscriber.tagName == 'SELECT'){
                        subscriber.value = self.value;
                    } else {
                        subscriber.innerText = self.value;
                    }
                }
            });
        };

        for(var k = 0; k < properties.events.length; k++) {
            event = properties.events[k].trim();
            observable.addEventListener(event, observable.notifySubscribers);
            observable.addSubscriber(observer);
        }
    }
})("[data-observer]", window);