export const fieldBarang = [{
        label: 'ID Barang',
        key: 'idBarang',
        type: 'text',
        primaryKey: true
    },{
        label: 'Nama',
        key: 'namaBarang',
        type: 'text'
    },{
        label: 'Stok',
        key: 'stok',
        type: 'number'
    },{
        label: 'Modal Beli',
        key: 'modalBeli',
        type: 'number'
    },{
        label: 'Harga Jual',
        key: 'hargaJual',
        type: 'number'
    },{
        label: 'Satuan',
        key: 'idSatuan',
        type: 'select',
        detail: 'namaSatuan'
    },{
        label: 'Kategori',
        key: 'idKategori',
        type: 'select',
        detail: 'nmKategori'
    }
]

export const fieldKategori = [{
    label: 'ID Kategori',
    key: 'idKategori',
    type: 'number',
    primaryKey:true
},{
    label: 'Nama Kategori',
    key: 'nmKategori',
    type: 'text',
},]


export const fieldSatuan = [{
    label: 'ID Satuan',
    key: 'idSatuan',
    type: 'number',
    primaryKey:true
},{
    label: 'Nama Satuan',
    key: 'namaSatuan',
    type: 'text',
},]


export const fieldSupplier = [{
    label: 'ID Supplier',
    key: 'idSupplier',
    type: 'text',
    primaryKey: true
},{
    label: 'Nama Supplier',
    key: 'nmSupplier',
    type: 'text',
},{
    label: 'No Telp',
    key: 'noTelp',
    type: 'text',
},{
    label: 'Alamat',
    key: 'alamat',
    type: 'text',
},{
    label: 'Penanggung Jawab',
    key: 'penanggungJawab',
    type: 'text',
},]


export const fieldPegawai = [{
    label: 'ID Pegawai',
    key: 'idPegawai',
    type: 'text',
    primaryKey: true
},{
    label: 'Nama Pegawai',
    key: 'nmPegawai',
    type: 'text',
},{
    label: 'Alamat',
    key: 'alamat',
    type: 'text',
},{
    label: 'No Telp',
    key: 'noTelp',
    type: 'text',
},{
    label: 'Jabatan',
    key: 'jabatan',
    type: 'select',
},{
    label: 'Email',
    key: 'email',
    type: 'text'
}]


export const fieldUser = [{
    label: 'ID User',
    key: 'userId',
    type: 'text',
    primaryKey: true
},{
    label: 'Nama Pegawai',
    key: 'nmPegawai',
    type: 'text',
},{
    label: 'ID Pegawai',
    key: 'idPegawai',
    type: 'text',
},{
    label: 'email',
    key: 'email',
    type: 'text',
},{
    label: 'Jabatan',
    key: 'jabatan',
    type: 'text',
},{
    label: 'Status',
    key: 'status',
    type: 'text',
}]