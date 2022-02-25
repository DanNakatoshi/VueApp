import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCurrentPrice(){
    return apiClient.get('')
  },
}


