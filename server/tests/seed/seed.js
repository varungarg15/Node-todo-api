const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
_id: userOneId,
email: 'varun@example.com',
password: 'userOnePass',
tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, '123abc').toString()
}]
}, {
 _id: userTwoId,
 email: 'vipul@gmail.com',
 password: 'userTwoPass',
 tokens: [{
  access: 'auth',
  token: jwt.sign({_id: userTwoId, access: 'auth'}, '123abc').toString()
}]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }];

  var populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  }


  var populateUsers = (done) => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    User.remove({}).then(() => {
       return Promise.all([userOne, userTwo])
    }).then(() => done());
  }

  module.exports = {todos, populateTodos, users, populateUsers  };