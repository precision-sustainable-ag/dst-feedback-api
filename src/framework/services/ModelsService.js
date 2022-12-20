const { DatabaseProvider } = require("../../app/providers/DatabaseProvider");
const { ValidatorProvider } = require("../../app/providers/ValidatorProvider");
const { Model } = require("../models/Model");


class ModelsService {

    static _model;
    static _schema;

    static model(){
        return Model;        
    }

    static Schema(){
        return {};
    }

    static async Add(data){
        const model = this.getModel();
        const data = this.Validate(data);

        const record = await model.findOne({where:{id:data.id}, paranoid: false});

        if(!record){
            return this.Create(data);
        }

        return this.Update(record, data);
    }

    static async Create(data) {
        const model = this.getModel();
        data = this.Validate(data);


        return model.create(data);
    }

    static async Update(record, data) {
        data = this.Validate(data);

        return record.update(data);
    }


    static getModel(){
        if(this._model) return this._model;

        const model = this.model();

        model.register(DatabaseProvider);

        return this._model = model;
    }


    static getSchema(){
        if(this._schema) return this._schema;

        return this._schema = this.Schema();
    }


    static Validate(data){
        const schema = this.getSchema();
        return ValidatorProvider.factory().validate({schema,rules});
    }



}

module.exports = {
    ModelsService
}