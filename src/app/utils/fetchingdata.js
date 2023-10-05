export const getTotalRow = async(page) => {
    const response = await fetch(`/api/${page}/totalrow`)
    const data = await response.json()
    return data.totalRow
}

export const getInitialData = async(page, currentPage, token) => {
    try {
      const response = await fetch(`/api/${page}?page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (data.status === 200) {
        return {
          data : data.data,
          paggination: true
        }
      } else {
        return {
          data: [],
          paggination: false,
          message: data.message
        }
      }
    } catch (error) {
      console.error(error)
      return {
        data: [],
        paggination: false,
        message: "Ada kesalahan saat memanggil barang"
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
    if(searchQuery?.keyword?.length > 0){
      response = await fetch(`/api/${page}/searching?keyword=${searchQuery?.keyword}`)
    } else {
      response = await fetch(`/api/${page}?page=${currentPage}`)
    } 
  } else {
    if(searchQuery?.idKategori?.length > 0){
      response = await fetch(`/api/barang/searching?kategori=${searchQuery?.idKategori}`)
    } else if(searchQuery?.keyword?.length > 0 || searchQuery?.namaBarang?.length > 0 ){
      response = await fetch(`/api/barang/searching?keyword=${searchQuery?.keyword}`)
    } else if(searchQuery?.idKategori?.length > 0 && searchQuery?.keyword?.length > 0){
      response = await fetch(`/api/barang/searching?kategori=${searchQuery?.idKategori}&&keyword=${searchQuery?.keyword}`)
    } else {
      response = await fetch(`/api/barang?page=${currentPage}`)
    }
  }
  const data = await response.json()
  return data
} 

export const searchBarangByName = async(keyword) => {
  let response
  if(keyword.length > 0){
    response = await fetch(`/api/barang/searching?keyword=${keyword}`)
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

export const loginAuth = async(user) => {
  try {
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user
        })
    });

    const data = await response.json();

    return {
      data
    }
    
  } catch (error) {
    return {
      status: 401,
      message: "Gagal login"
    }
    
  }
}

export const logoutAuth = async(loginData) => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginData
      })
    })
    const data = await response.json()

    if(data.status === 200){
      localStorage.removeItem('auth')
    }
    return data

  } catch (error) {
    console.error('Ada kesalahan :', error)
  }

}