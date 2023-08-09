export const fieldTableBarang = [{
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
    }]

export const fieldTableSatuan = [
    {
        label: 'No',
        key: 'no'
    },{
        label: 'Nama Satuan',
        key: 'namaSatuan'
    }]