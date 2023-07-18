const axios = require('axios');

describe('render', () => {
    test('the render get all', async () => {
        const res = await axios.get('http://localhost:3000/render');
    
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    test('the render get one by id', async () => {
        const res = await axios.get('http://localhost:3000/render/64b19829fdb8a32698a37691');

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    test('the render get one by id with incorrect route', async () => {
        try {
            await axios.get('http://localhost:3000/render/64b19829fdb8a32698a376');
        } catch (error) {
            
            const message = error.response.data;

            expect(error.response.data).toBeTruthy();
            expect(error.response.data).toEqual('Use a valid id to find the data!');
        };      
    });
});//end describe