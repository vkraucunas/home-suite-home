// @flow

const convertObjectToMap = (input:*) => {
    const result = new Map();

    Object.keys(input)
        .forEach(key => { result.set(key, input[key]) });

    return result;
};

class BaseModel{
    modelConstructor: *;
    get: (name:string) => *;
    set: (name:string, value:*) => $Subtype<BaseModel>;
    _props: *;
    constructor(defaults:*,input:*) {
        this._props = Object.assign({},defaults,this._props || {}, input);
        this.get = name => this._props[name];
        this.set = (name:string, value:*) => {
            let assignedObject = {};
            assignedObject[name] = value;
            let result = Object.assign({}, this._props,assignedObject);

            return new this.modelConstructor(result);
        }
    }
}

export default BaseModel;