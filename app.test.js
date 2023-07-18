const axios = require('axios');

const url = 'http://localhost:3000';


    test('the homeRoute', async () => {
        const res = await axios.get(url);

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });
    
