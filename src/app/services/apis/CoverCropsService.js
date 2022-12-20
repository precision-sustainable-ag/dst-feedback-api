

const config = require('../../../config/cropsService');
const { Log } = require('../../providers/LoggingProvider');
const { HttpClient } = require('../http/HttpClient');

class CoverCropsService {

    static url(uri){
        const url = config.url;
        if(!uri) return url;

        return `${url}/${uri}`;
    }

    static async Retrieve(uri){
        const url = this.url(uri);

        const response = await HttpClient.get(url).catch(err => {
            Log.Critical({heading:`Failed to get ${uri} data`, message:err});
        });

        if(response.status == 200){
            return response.data.data;
        }

        return {};
    }

    static async GetGroups(){
        return this.Retrieve(config.groups);
    }

    static async GetFamilies(){
        return this.Retrieve(config.families);
    }

    static async GetCrops(){
        return this.Retrieve(config.crops);
    }

    static async GetZones(){
        return this.Retrieve(config.zones);
    }

    static async GetCropsZones(){
        return this.Retrieve(config.crops_zones);
    }

    static async GetRegions(){
        return this.Retrieve(config.regions);
    }


}

module.exports = {
    CoverCropsService
}