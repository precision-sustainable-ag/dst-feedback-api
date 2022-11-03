const { ValidatorService } = require('../services/validation/ValidatorService');


class ValidatorProvider {

    static async register(){
        
        return true;
    }

    static factory(){
        return ValidatorService;
    }
}

module.exports = {
    ValidatorProvider
}

