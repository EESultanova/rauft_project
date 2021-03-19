const User = require('./User')
const { connect, disconnect } = require('mongoose');
connect('mongodb://localhost:27017/p2w2d4', { useNewUrlParser: true, useUnifiedTopology: true });

const users = [
/*   {
    name: 'admin',
    login: 'admin',
    email: 'admin@admin.com',
    pass: '111111',
    role: 0,
    date_of_birth: '1111-11-11',
    education: 'default',
    industry: 'default',
    hobby: 'default',
    favorite_music: 'default',
    favorite_artwork: 'default',
    favorite_book: 'default',
    favorite_movie: 'default',
    favorite_cousine: 'default',
    favorite_car_brand: 'default',
    favorite_place: 'default',
  }, */
 /*  {
    name: 'test-user',
    login: 'test-user',
    email: 'atest-user@admin.com',
    pass: '111111',
    role: 1,
    date_of_birth: '1111-11-12',
    education: 'default',
    industry: 'default',
    hobby: 'default',
    favorite_music: 'default',
    favorite_artwork: 'default',
    favorite_book: 'default',
    favorite_movie: 'default',
    favorite_cousine: 'default',
    favorite_car_brand: 'default',
    favorite_place: 'default',
  }, */
  {
    name: 'test-candidate6',
    login: 'test-candidate7',
    email: 'test-candidate85@admin.com',
    pass: '111111',
    role: 2,
    date_of_birth:  '2008-11-3',
    education: 'default',
    industry: 'default',
    hobby: 'default',
    favorite_music: 'default',
    favorite_artwork: 'default',
    favorite_book: 'default',
    favorite_movie: 'default',
    favorite_cousine: 'default',
    favorite_car_brand: 'default',
    favorite_place: 'default',
  }
]

async function main() {
  await User.insertMany(users)
  disconnect()
}

main()
