const getAll = require('./mongoDb');
//const axios = require('axios');

//jest.mock('axios');

test('should return acurate addition of a and b', () => {
    expect(getAll.sum(1, 3)).toBe(4);
});


