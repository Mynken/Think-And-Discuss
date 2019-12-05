// var expect = require('chai').expect;
// const mongoose = require('mongoose');
// const Users = mongoose.model('Users');

// describe('User repository:', function () {
//     it('should create new user', function () {
      
//       const user = {
//         email: 'test@email.com',
//         password: "new@Password"
//       };

//       const finalUser = new Users(user);

//       finalUser.setPassword(user.password);

//       finalUser.save();

//       const dbUser = null;
//       Users.find({email: user.email}).then((dbUser) => { dbUser = dbUser});
        

//       // 3. ASSERT
//       expect(dbUser).to.be.equal(finalUser);
  
//     });
//   });