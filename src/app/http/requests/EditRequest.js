const { ValidatorProvider } = require('../../providers/ValidatorProvider');
const { RetrieveRequest } = require('./RetrieveRequest');

class EditRequest extends RetrieveRequest {


    model(){
        return null;
    }
    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
        };
    }
    
    /**
     * Determines whether or not a given set of properties is required in request body.
     * @param {*} req express request variable.
     * @param {*} properties Model.attributes[i]
     * @returns boolean
     */
    nullableAttributeResolver(req, properties){
        if(req.method == 'POST'){
            return properties?.allowNull;
        }
        return true;
    }

    /**
     * resolves the model objects attribtues into a rules object.
     * by default if the request is a PUT request then all fields are considered not required.
     * and if the request is a POST then fields are considered required if the attribute is set to allowNull: false.
     * this can be changed by overriding the nullableAttributeResolver function in a child class.
     */
    getModelRules(req){
        const rules = {};
        const model = this.model();
        const attributes = model.attributes();

        for(let [attribute, properties] of Object.entries(attributes)) {
            if(properties.primaryKey) continue;
            const dataType = ValidatorProvider.factory().ConvertDataTypeToRule(properties.type);
            const required = this.nullableAttributeResolver(req, properties) ? '' : 'required|';
            // let required = '';
            // if(req.method == 'POST') required = properties.allowNull ? '' : 'required|';
            rules[attribute] = `${required}${dataType}`;
        }
        
        return rules;
    }

    getRules(req){
        const rules = this.rules(req);
        const paramRules = this.getParamRules(req);
        const modelRules = this.getModelRules(req);

        return {
            ...modelRules,
            ...paramRules,
            ...rules,
        };
    }

    data(req){
        this._data = req.body;
        // inject all params into data.
        const params = this.params();

        for(let key in params){
            this._data[key] = req.params[key];
        }

        return this._data;
    }

}

module.exports = {
    EditRequest
}