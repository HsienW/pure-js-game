/** Observer pattern **/

const initialState = {
    name: 'initial',
    subscriberName: 'initial'
};

const observer = function () {
    this.observers = [];
    this.state = {};

    this.updateState = function (updateObj) {
        if (Object.keys(updateObj).length === 0) {
            this.state = {
                ...initialState
            };
        } else {
            Object.keys(updateObj).map(key => {
                this.state = {
                    ...this.state,
                    [key]: updateObj[key]
                };
            });
        }
        this.notifyObservers();
    };

    this.notifyObservers = function () {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => {
                observer(this.state);
            });
        }
    };

    this.addObserver = function (observer) {
        this.observers.push(observer);
        return () => {
            const index = this.observers.indexOf(observer);
            this.observers.splice(index, 1);
        };
    };

    return {
        updateState: this.updateState,
        notifyObservers: this.notifyObservers,
        addObserver: this.addObserver
    };
};

export {
    observer
}
