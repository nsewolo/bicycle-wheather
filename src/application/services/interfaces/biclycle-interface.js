import axios from 'axios';

export class BicycleInterface {

    constructor() {}

    async getBicycleCompany(company) {
        if ( !company ) {
            return undefined;
        }
        return await this.findBicycleCompany(company)
    }

    async findBicycleCompany(company) {
        try {
            const response = await axios.get('http://api.citybik.es/v2/networks');

            console.log('response', response);
            const networks = response['networks'];

            for (const network of networks.data) {
                let cmp = network['id'];
                if (cmp === company) {
                    console.info(`Returned a valid city: ${cmp}`);
                    return cmp;
                }
            }
            console.debug(`No valid response received from tier api`);

            return undefined;
        } catch (e) {
            throw {message: `Error when validating json: ${e.message}`};
        }
    }
}