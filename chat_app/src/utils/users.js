/*
 * Note:
 * findIndex()  -> we get the position of the an array item
 * find()       -> returns the first element in the array that satisfies condition
 * filter()     -> returns an array of all elements that pass the test
*/

const users = [];

// Add user
const addUser = ({ id, username, room }) => {

  // Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check for an existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate the existing user... if: return error
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  // else: Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};


// Remove user
const removeUser = (id) => {

  // index: 0 or greater if there is a match & -1 if there is no match
  const index = users.findIndex((user) => {
    return user.id === id
  })

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

// get a user
const getUser = (id) => {
  return users.find((user) => {
    return user.id === id
  })
}


// get all users in a room
const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase()
  return users.filter((user) => user.room === room)
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}