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
        join: true,
        altKey: 'namaSatuan'
    },{
        label: 'Kategori',
        key: 'idKategori',
        type: 'select',
        join: true,
        altKey: 'nmKategori'
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

export const fieldKonsumen = [{
    label: 'ID Konsumen',
    key: 'idKonsumen',
    type: 'text',
    primaryKey: true
},{
    label: 'Nama Konsumen',
    key: 'nmKonsumen',
    type: 'text',
},{
    label: 'No Telp',
    key: 'noTelp',
    type: 'text',
},{
    label: 'Alamat',
    key: 'alamat',
    type: 'text',
}]


export const menu = [{
    id: 'home',
    label: 'Home',
    pathName: '/',
    jabatan: ['administrator','pimpinan','pegawai'],
    child: null
},{
    id: 'master',
    label: 'Master',
    pathName: '/',
    jabatan: ['administrator','pimpinan','pegawai'],
    child: [{
        id: 'barang',
        label: 'Barang',
        pathName: '/barang',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    },{
        id: 'kategori',
        label: 'Kategori Barang',
        pathName: '/kategori',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    },{
        id: 'satuan',
        label: 'Satuan Barang',
        pathName: '/satuan',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    },{
        id: 'supplier',
        label: 'Supplier',
        pathName: '/supplier',
        jabatan: ['administrator','pimpinan'],
        child: null
    },{
        id: 'konsumen',
        label: 'Konsumen',
        pathName: '/konsumen',
        jabatan: ['administrator','pimpinan'],
        child: null
    },{
        id: 'pegawai',
        label: 'Pegawai',
        pathName: '/pegawai',
        jabatan: ['administrator','pimpinan'],
        child: null
    },{
        id: 'user',
        label: 'User',
        pathName: '/user',
        jabatan: ['administrator','pimpinan'],
        child: null
    }]
},{
    id: 'transaksi',
    label: 'Transaksi',
    pathName: '/',
    jabatan: ['administrator','pimpinan','pegawai'],
    child: [{
        id: 'pembelian',
        label: 'Pembelian',
        pathName: '/pembelian',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    },{
        id: 'penjualan',
        label: 'Kategori Barang',
        pathName: '/penjualan',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    }]
},{
    id: 'hutangpituang',
    label: 'Hutang/Piutang',
    pathName: '/',
    jabatan: ['administrator','pimpinan','pegawai'],
    child: [{
        id: 'hutang',
        label: 'Hutang',
        pathName: '/hutang',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    },{
        id: 'piutang',
        label: 'Piutang',
        pathName: '/piutang',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    }]
},{
    id: 'laporan',
    label: 'Laporan',
    pathName: '/laporan',
    jabatan: ['administrator','pimpinan'],
    child: null
},]