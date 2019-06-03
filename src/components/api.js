import apiUrl from '../apiConfig'
import axios from 'axios'

export const newAddress = (addressesObject, token) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/addresses',
    headers: {
      'Authorization': `Token token=${token}`
    },
    data: {
      address: {
        firstAddress: addressesObject.firstAddress,
        secondAddress: addressesObject.secondAddress
      }
    }
  })
}

export const indexAllAddresses = token => {
  return axios({
    url: apiUrl + '/addresses',
    method: 'GET ',
    headers: {
      'Authorization': `Token token=${token}`
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
