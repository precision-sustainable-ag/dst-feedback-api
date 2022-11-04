const { EditRequest } = require('../EditRequest');

class CreateFeedbackRequest extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     */
    model(){
        return null;
    }

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
            repository: ['required','string'],
            title: ['string'],
            name: ['required','string'],
            email: ['required','email'],
            comment: ['required','string'],
            labels: ['array'],
            'labels.*': ['string']
        }
    }

    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
        };
    }
    

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    CreateFeedbackRequest
};


