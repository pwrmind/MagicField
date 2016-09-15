(function (selector) {
    var subscribers = [];
    var observers = document.querySelectorAll(selector);

    var addSubscribers = function(subscribers) {
        for (var i in subscribers) {
            subscribers[i].observable = this;
            this.subscribers.push(subscribers[i]);
        }
    };

    var notifySubscribers = function() {
        for(var i in this.subscribers) {
            this.subscribers[i].innerHTML = this.value;
        }
    };

    element.oninput = this.notifySubscribers;

    return Object.assign(element, this);
})("[data-observer]");

var field_01 = new Field(document.getElementById('field_01'));
var subscribers = new Field(document.querySelectorAll(".subscribers"));
field_01.addSubscribers(subscribers);