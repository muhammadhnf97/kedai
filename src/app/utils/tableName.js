export const fieldBarang = [{
        label: 'ID Barang',
        key: 'idBarang',
        type: 'text',
        primaryKey: true,
        manualInput: false,
        showOn : ['view', 'add', 'edit']
    },{
        label: 'Nama',
        key: 'namaBarang',
        type: 'text',
        primaryKey: false,
        manualInput: true,
        showOn : ['view', 'add', 'edit']
    },{
        label: 'Stok',
        key: 'stok',
        type: 'number',
        primaryKey: false,
        manualInput: true,
        showOn : ['view', 'add', 'edit']
    },{
        label: 'Modal Beli',
        key: 'modalBeli',
        type: 'number',
        primaryKey: false,
        manualInput: true,
        showOn : ['view', 'add', 'edit']
    },{
        label: 'Harga Jual',
        key: 'hargaJual',
        type: 'number',
        primaryKey: false,
        manualInput: true,
        showOn : ['view', 'add', 'edit']
    },{
        label: 'Satuan',
        key: 'idSatuan',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        showOn : ['view', 'add', 'edit'],
        join: true,
        altKey: 'namaSatuan'
    },{
        label: 'Kategori',
        key: 'idKategori',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        showOn : ['view', 'add', 'edit'],
        join: true,
        altKey: 'nmKategori'
    },{
        label: 'Satuan',
        key: 'namaSatuan',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        showOn : ['add', 'edit']
    },{
        label: 'Kategori',
        key: 'nmKategori',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        showOn : ['add', 'edit']
    }
]

export const fieldKategori = [{
    label: 'ID Kategori',
    key: 'idKategori',
    type: 'number',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Nama Kategori',
    key: 'nmKategori',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},]


export const fieldSatuan = [{
    label: 'ID Satuan',
    key: 'idSatuan',
    type: 'number',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Nama Satuan',
    key: 'namaSatuan',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},]


export const fieldSupplier = [{
    label: 'ID Supplier',
    key: 'idSupplier',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Nama Supplier',
    key: 'nmSupplier',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'No Telp',
    key: 'noTelp',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Alamat',
    key: 'alamat',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Penanggung Jawab',
    key: 'penanggungJawab',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},]


export const fieldPegawai = [{
    label: 'ID Pegawai',
    key: 'idPegawai',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Nama Pegawai',
    key: 'nmPegawai',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Alamat',
    key: 'alamat',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'No Telp',
    key: 'noTelp',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Jabatan',
    key: 'jabatan',
    type: 'select',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Email',
    key: 'email',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
}]

export const fieldUser = [{
    label: 'ID User',
    key: 'userId',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Nama Pegawai',
    key: 'nmPegawai',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'ID Pegawai',
    key: 'idPegawai',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'email',
    key: 'email',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Jabatan',
    key: 'jabatan',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Status',
    key: 'status',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
}]

export const fieldKonsumen = [{
    label: 'ID Konsumen',
    key: 'idKonsumen',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Nama Konsumen',
    key: 'nmKonsumen',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'No Telp',
    key: 'noTelp',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Alamat',
    key: 'alamat',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
}]

export const fieldPembelian = [{
    label: 'ID Pembelian',
    key: 'idPembelian',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Tanggal Beli',
    key: 'tglBeli',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Pegawai',
    key: 'nmPegawai',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Konsumen',
    key: 'nmKonsumen',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Barang',
    key: 'Nama Barang',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Jumlah Beli',
    key: 'jumlahBeli',
    type: 'number',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Harga Beli',
    key: 'hargaBeli',
    type: 'number',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add', 'edit']
},{
    label: 'Total Harga',
    key: 'totalHarga',
    type: 'number',
    primaryKey: false,
    manualInput: false,
    showOn : ['view', 'add', 'edit']
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