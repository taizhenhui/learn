import axios from "axios";
// redux-thunk 风格
// function getCinemaListAction() {
//   return (dispatch) => {
//     axios({
//       url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5790034',
//       method: 'get',
//       headers: {
//         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1670389696259381664940033","bc":"110100"}',
//         'X-Host': 'mall.film-ticket.cinema.list'
//       }
//     }).then(res => {
//       let { data: { cinemas }, } = res.data
//       console.log(cinemas, 'cinemas');
//       dispatch({
//         type: 'change-list',
//         value: cinemas
//       })
//     }).catch(err => err)
//   }
// }

// redux-promise
// function getCinemaListAction() {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5790034',
//     method: 'get',
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1670389696259381664940033","bc":"110100"}',
//       'X-Host': 'mall.film-ticket.cinema.list'
//     }
//   }).then(res => {
//     let { data: { cinemas }, } = res.data
//     console.log(cinemas, 'cinemas');
//     return {
//       type: 'change-list',
//       value: cinemas
//     }
//   }).catch(err => err)
// }

// redux-promise async await
async function getCinemaListAction() {
  let list =  await axios({
    url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5790034',
    method: 'get',
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1670389696259381664940033","bc":"110100"}',
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  }).then(res => {
    let { data: { cinemas }, } = res.data
    console.log(cinemas, 'cinemas');
    return {
      type: 'change-list',
      value: cinemas
    }
  }).catch(err => err)
  return list
}

export default getCinemaListAction