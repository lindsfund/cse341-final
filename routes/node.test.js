const axios = require('axios');

describe('nodeJS', () => {
    test('the nodeJS get all', async () => {
        const res = await axios.get('http://localhost:3000/nodeJS');
    
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    test('the nodeJS get one by id', async () => {
        const res = await axios.get('http://localhost:3000/nodeJS/64b19829fdb8a32698a37691');

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    test('the nodeJS get one by id with incorrect route', async () => {
        try {
            await axios.get('http://localhost:3000/nodeJS/64b19829fdb8a32698a376');
        } catch (error) {
            
            const message = error.response.data;

            expect(error.response.data).toBeTruthy();
            expect(error.response.data).toEqual('Use a valid id to find the data!');
        };      
    });
});//end describe