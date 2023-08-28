export const getTotalRow = async(page) => {
    const response = await fetch(`/api/${page}/totalrow`)
    const data = await response.json()
    return data.totalRow
}

export const getInitialData = async(page, currentPage) => {
    try {
        const response = await fetch(`/api/${page}?page=${currentPage}`)
        const data = await response.json()
        if(data.status === 200){
            return data
        } else {
            return {
                isNotif: true,
                alertTitle: 'info',
                desc: 'Gagal mengambil dari database'
            }
        }
    } catch (error) {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: 'Gagal mengambil dari database'
        }
    }
}

export const getDataById = async(page, id) => {
    try {
      const response = await fetch(`/api/${page}/databyid?id=${id}`)
      const data = await response.json()
      
      if(data.status === 200){
        return data
      } else {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: data.message
        }
      }
    } catch (error) {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: "Gagal mengambil dari database"
        }
    }
}

export const postData = async(page, insertData) => {
  const response = await fetch(`/api/${page}`, {
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      insertData
    })            
  })
  const data = await response.json()
  return {
    data,
    isNotif: true,
    alertTitle: 'info',
    desc: data.message
  }
}

export const deleteData = async(page, tempData) => {
    try {
      const response = await fetch(`/api/${page}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tempData
        })
      })

      const data = await response.json()

      return {
        isNotif: true,
        alertTitle: 'info',
        desc: data.message
      }
    } catch (error) {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: "Gagal mengambil dari database"
        }
    }
}

export const updateData = async(page, tempData) => {
    try {
        const response = await fetch(`/api/${page}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tempData
          })
        })
  
        const data = await response.json()

      return {
        data,
        isNotif: true,
        alertTitle: 'info',
        desc: data.message
      }
    } catch (error) {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: "Gagal mengambil dari database"
        }
    }
}

export const getBasedSearch = async(page, searchQuery, currentPage) => {
  let response
  if(page !== 'barang'){
    if(searchQuery.keyword.length > 0){
      response = await fetch(`/api/${page}/searching?keyword=${searchQuery.keyword}`)
    } else {
      response = await fetch(`/api/${page}?page=${currentPage}`)
    } 
  } else {
    if(searchQuery.idKategori.length > 0){
      response = await fetch(`/api/barang/searching?kategori=${searchQuery.idKategori}`)
    } else if(searchQuery.keyword.length > 0){
      response = await fetch(`/api/barang/searching?keyword=${searchQuery.keyword}`)
    } else if(searchQuery.idKategori.length > 0 && searchQuery.keyword.length > 0){
      response = await fetch(`/api/barang/searching?kategori=${searchQuery.idKategori}&&keyword=${searchQuery.keyword}`)
    } else {
      response = await fetch(`/api/barang?page=${currentPage}`)
    }
  }
  const data = await response.json()
  return data
} 

export const createUser = async(tempData) => {
    try {
        const response = await fetch(`/api/user/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPegawai : tempData.idPegawai
          })
        })
        const data = await response.json()

      return {
        isNotif: true,
        alertTitle: 'info',
        desc: data.message
      }
    } catch (error) {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: "Gagal mengambil dari database"
        }
    }
}

export const updateUser = async(tempData) => {
    try {
        const response = await fetch(`/api/user/inactiveuser`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPegawai : tempData.idPegawai
          })
        })
        const data = await response.json()

      return {
        isNotif: true,
        alertTitle: 'info',
        desc: data.message
      }
    } catch (error) {
        return {
            isNotif: true,
            alertTitle: 'info',
            desc: "Gagal mengambil dari database"
        }
    }
}

export const logoutAuth = async(loginData) => {
  try {
    const checkLocalStorage = localStorage.getItem('auth')

    if ( checkLocalStorage ){
        const response = await fetch('/api/auth/logout', {
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            loginData
          })
        })
        const data = await response.json()
        
        if(data.status === 200){
          localStorage.removeItem("auth")

          return {
            status: 200,
            isNotif: true,
            desc: data.message
          }
        } else {
          return {
            status: 401,
            message: "Gagal Logout"
          }
      }
    }







    
  } catch (error) {
    
  }


  


}