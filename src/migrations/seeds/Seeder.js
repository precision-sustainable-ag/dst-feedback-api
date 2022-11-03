

const Seeds = [
];

module.exports = class Seeder {

    static async sow(){

        for(let seed of Seeds){
    
            const data = await seed.plant();
    
        }
    }
}
