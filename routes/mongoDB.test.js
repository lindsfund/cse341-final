const axios = require('axios');

describe('mongoDB', () => {
    test('the mongoDB get all', async () => {
        const res = await axios.get('http://localhost:3000/mongodb');
    
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    test('the mongoDb get one by id', async () => {
        const res = await axios.get('http://localhost:3000/mongodb/64ac8d91ae00289471b60cbb');

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    test('the mongoDb get one by id with incorrect route', async () => {
        try {
            await axios.get('http://localhost:3000/mongodb/64ac8d91ae00289471b60c');
        } catch (error) {
            
            const message = error.response.data;

            expect(error.response.data).toBeTruthy();
            expect(error.response.data).toEqual('Use a valid id to find the data!');
        };      
    });
});//end describe