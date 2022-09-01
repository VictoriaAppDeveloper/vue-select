/*import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export default function (_, inject) {
  const mock = new MockAdapter(axios)

  mock.onGet('/gateway/api/v1/users',
    { params: { page: 1, search: '' } }
    ).reply((config) => {
      console.log(config)
  })
  inject('mock', axios)
}*/
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const randomWord = (length) => {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

const randomNumber = (length) => {
  let result           = '';
  let characters       = '1234567890';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}


const randomId = () => Math.floor(new Date().valueOf() * Math.random())

const genUsers = () => Array.from({ length: 100 }, (_, i) => ({
  email: randomWord(12),
  phone: randomNumber(8),
  full_name: randomWord(15),
  id: randomId()
}))

const getUsers = (users, search = '', page = 1, noPagination = 0) => {
  let data = users
  let current_page = 1
  let last_page = 1

  if (!noPagination) {
    if (search.length) {
      data = data.filter(user => {
        const s = search.toLowerCase()
        return user.email.toLowerCase().includes(s) ||
          user.phone.toLowerCase().includes(s) ||
          user.full_name.toLowerCase().includes(s);
      })
    }
    current_page = page
    last_page = Math.ceil(data.length / 20) || 1

    data = data.slice((page - 1) * 20, page * 20)
  }

  return {
    data,
    current_page,
    last_page
  }

}

export default {
  init() {
    let mock = new MockAdapter(axios);
    let users = genUsers()
    mock.onGet(/gateway\/api\/v1\/users\/?.*/).reply(config => {
      const page = config.params.page
      const search = config.params.search
      const noPagination = config.params.noPagination
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, getUsers(users, search, page, noPagination)])
        }, 2000)
      })
    })
  }
}
