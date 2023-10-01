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
        label: 'Harga Satuan',
        key: 'hargaSatuan',
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
        showOn : ['add']
    },{
        label: 'Kategori',
        key: 'idKategori',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        showOn : ['add']
    },{
        label: 'Satuan',
        key: 'namaSatuan',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        displayKey: 'namaSatuan',
        showOn : ['view', 'edit']
    },{
        label: 'Kategori',
        key: 'nmKategori',
        type: 'select',
        primaryKey: false,
        manualInput: true,
        displayKey: 'nmKategori',
        showOn : ['view', 'edit']
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
},{
    label: 'Turunan',
    key: 'turunan',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view', 'add']
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
    showOn : [],
    selectBarangFirst: false
},{
    label: 'Tanggal Beli',
    key: 'tglBeli',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : [],
    selectBarangFirst: false
},{
    label: 'Pegawai',
    key: 'nmPegawai',
    type: 'text',
    primaryKey: false,
    manualInput: false,
    showOn : [],
    selectBarangFirst: false
},{
    label: 'Supplier',
    key: 'idSupplier',
    type: 'select',
    primaryKey: false,
    manualInput: true,
    showOn : ['add'],
    selectBarangFirst: false
},{
    label: 'No Faktur',
    key: 'noFaktur',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['add'],
    selectBarangFirst: false
},{
    label: 'ID Barang',
    key: 'idBarang',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view'],
    selectBarangFirst: false
},{
    label: 'Nama',
    key: 'namaBarang',
    type: 'text',
    primaryKey: false,
    manualInput: true,
    showOn : ['view'],
    selectBarangFirst: false
},{
    label: 'Jumlah Beli',
    key: 'jumlahBeli',
    type: 'number',
    primaryKey: false,
    manualInput: true,
    showOn : ['add', 'view'],
    selectBarangFirst: true
},{
    label: 'Harga',
    key: 'hargaBeli',
    type: 'currency',
    primaryKey: false,
    manualInput: true,
    showOn : ['add', 'view'],
    selectBarangFirst: true
},{
    label: 'Total',
    key: 'totalBayar',
    type: 'currency',
    primaryKey: false,
    manualInput: true,
    showOn : ['view'],
    selectBarangFirst: true
}]

export const fieldPenjualan = [{
    label: 'No Nota',
    key: 'noNota',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : [],
    kunciKonsumen: false
},{
    label: 'idKonsumen',
    key: 'idKonsumen',
    type: 'text',
    primaryKey: true,
    manualInput: false,
    showOn : ['add'],
    kunciKonsumen: false
},{
    label: 'Konsumen',
    key: 'nmKonsumen',
    type: 'select',
    primaryKey: true,
    manualInput: false,
    showOn : [],
    kunciKonsumen: false
}]

export const fieldPiutang = [
    {
    label: 'Konsumen',
    key: 'idKonsumen',
    type: 'select',
    manualInput: true,
    showOn: ['add']
    },
    {
    label: 'No Nota',
    key: 'noNota',
    type: 'select',
    manualInput: true,
    showOn: ['add']
    },
    {
    label: 'Tanggal Pembelian',
    key: 'tglJual',
    type: 'text',
    manualInput: true,
    showOn: ['detail']
    },
    {
    label: 'Deposit',
    key: 'deposit',
    type: 'number',
    manualInput: true,
    showOn: ['detail']
    },
    {
    label: 'ID Barang',
    key: 'idBarang',
    type: 'text',
    manualInput: true,
    showOn: ['table']
    },
    {
    label: 'Barang',
    key: 'namaBarang',
    type: 'text',
    manualInput: true,
    showOn: ['table']
    },
    {
    label: 'Jumlah',
    key: 'jumlah',
    type: 'number',
    manualInput: true,
    showOn: ['table']
    },
    {
    label: 'Harga Jual',
    key: 'hargaJual',
    type: 'number',
    manualInput: true,
    showOn: ['table']
    },
    {
    label: 'Total',
    key: 'total',
    type: 'number',
    manualInput: true,
    showOn: ['table']
    }
    
]

export const fieldHutang = [
    {
        label: 'ID Pembelian',
        key: 'idPembelian',
        type: 'text',
        primaryKey: true,
        manualInput: false,
        showOn : ['view'],
        selectBarangFirst: false,
        mobileView: true
    },{
        label: 'Tanggal Beli',
        key: 'tglBeli',
        type: 'text',
        primaryKey: false,
        manualInput: false,
        showOn : ['view'],
        selectBarangFirst: false,
        mobileView: true
    },{
        label: 'Barang',
        key: 'namaBarang',
        type: 'text',
        primaryKey: false,
        manualInput: true,
        showOn : ['view'],
        selectBarangFirst: false,
        mobileView: true
    },{
        label: 'Jumlah',
        key: 'jumlahBeli',
        type: 'number',
        primaryKey: false,
        manualInput: true,
        showOn : ['view'],
        selectBarangFirst: true,
        mobileView: true
    },{
        label: 'Harga Satuan',
        key: 'hargaBeli',
        type: 'currency',
        primaryKey: false,
        manualInput: true,
        showOn : ['view'],
        selectBarangFirst: true,
        mobileView: true
    },{
        label: 'Total',
        key: 'totalHarga',
        type: 'currency',
        primaryKey: false,
        manualInput: true,
        showOn : ['view'],
        selectBarangFirst: true,
        mobileView: true
    }
]

export const laporanPenjualan = [
    {
        label: 'No Nota',
        key: 'noNota',
        type: 'text',
    },
    {
        label: 'Tanggal',
        key: 'tglJual',
        type: 'text',
    },
    {
        label: 'Barang',
        key: 'namaBarang',
        type: 'text',
    },
    {
        label: 'Satuan',
        key: 'namaSatuan',
        type: 'text',
    },
    {
        label: 'Harga Jual',
        key: 'hargaJual',
        type: 'currency',
    },
    {
        label: 'Jumlah',
        key: 'jumlah',
        type: 'number',
    },
    {
        label: 'Total',
        key: 'total',
        type: 'currency',
    },
    {
        label: 'Status',
        key: 'status',
        type: 'text',
    },
]

export const laporanPembelian = [
    {
        label: 'Faktur',
        key: 'noFaktur',
        type: 'text',
    },
    {
        label: 'Tanggal',
        key: 'tglBeli',
        type: 'text',
    },
    {
        label: 'Barang',
        key: 'namaBarang',
        type: 'text',
    },
    {
        label: 'Satuan',
        key: 'namaSatuan',
        type: 'text',
    },
    {
        label: 'Harga Beli',
        key: 'hargaBeli',
        type: 'currency',
    },
    {
        label: 'Total',
        key: 'totalHarga',
        type: 'number',
    },
    {
        label: 'Total',
        key: 'total',
        type: 'currency',
    },
    {
        label: 'Status',
        key: 'status',
        type: 'text',
    },
]

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
        label: 'Penjualan',
        pathName: '/penjualan',
        jabatan: ['administrator','pimpinan','pegawai'],
        child: null
    },{
        id: 'konversi',
        label: 'Konversi Barang',
        pathName: '/konversi',
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