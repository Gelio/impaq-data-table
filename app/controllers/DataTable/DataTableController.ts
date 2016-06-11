import User from '../../User';

export default class DataTableController {
    constructor(WebService) {
        // Fetch initial data
        WebService.fetchInitialData()
            .then(response => {
                console.log('Got initial data', response);
            })
            .catch(error => {
                console.error('Error occured while fetching initial data', error);
            });
    }
}
