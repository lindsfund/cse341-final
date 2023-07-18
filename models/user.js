const getAll = async (mongodb) => {
    const result = await mongodb.getDb().db('learnResources').collection('users').find();
    return result.toArray()
  }
  
  const getSingle = async (mongodb, userId) => {
    const result = await mongodb
      .getDb()
      .db('learnResources')
      .collection('users')
      .find({ _id: userId });
    return result.toArray()
  };

  const getSingleByEmail = async (mongodb, email) => {
    const result = await mongodb
      .getDb()
      .db('learnResources')
      .collection('users')
      .find({ email: email });
    return result.toArray()
  };

  const getSingleByGoogleId = async (mongodb, userId) => {
    const result = await mongodb
      .getDb()
      .db('learnResources')
      .collection('users')
      .find({ googleId: userId });
    return result.toArray()
  };
  
  const createUser = async (mongodb, newUser) => {
    const response = await mongodb.getDb()
                                .db('learnResources')
                                .collection('users')
                                .insertOne(newUser)
    return response
  }
  
  const updateUser = async (mongodb, userId, newUser) => {
    const response = await mongodb.getDb()
                                  .db('learnResources')
                                  .collection('users')
                                  .replaceOne(
                                      {_id: userId},
                                      newUser
                                    )
    return response
  }
  
  
  const deleteUser = async (mongodb, userId) => {
    const response = await mongodb.getDb()
                                  .db('learnResources')
                                  .collection('users')
                                  .deleteOne(
                                      {_id: userId}
                                  )
    return response
  }
  
  
  module.exports = { 
    getAll, 
    getSingle,
    getSingleByGoogleId,
    getSingleByEmail,
    createUser, 
    updateUser, 
    deleteUser
  };