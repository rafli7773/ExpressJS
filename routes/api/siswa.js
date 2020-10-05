var express = require('express');
var router = express.Router();
var uudi = require('uuid');
var siswa = require('../../data');


// init data
router.get('/', (req, res) => res.json(siswa));

// create data
router.post('/', (req, res) => {
    const siswaBaru = {
        id: uudi.v4(),
        nama: req.body.nama,
        kelas: req.body.kelas,
        hobby: req.body.hobby
    }

    if (!siswaBaru.nama || !siswaBaru.kelas || !siswaBaru.hobby) {
        res.status(400).json({ pesan: "Masukkan dong" })
    }

    siswa.push(siswaBaru);
    // res.send(siswa);
    res.redirect('/')
})

// detail data
router.get('/:id', (req, res) => {
    const ditemukan = siswa.some(murid => murid.id === parseInt(req.params.id));
    if (ditemukan) {
        res.json(siswa.filter(murid => murid.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ 'pesan': `Siswa dengan id ${req.params.id} tidak ditemukan` })
    }
})

// ubah data
router.put('/:id', (req, res) => {
    const ditemukan = siswa.some(murid => murid.id === parseInt(req.params.id));
    if (ditemukan) {
        const ubahSiswa = req.body;
        siswa.forEach(murid => {
            if (murid.id == parseInt(req.params.id)) {
                murid.nama = ubahSiswa.nama ? ubahSiswa.nama : murid.nama;
                murid.kelas = ubahSiswa.kelas ? ubahSiswa.kelas : murid.kelas;
                murid.hobby = ubahSiswa.hobby ? ubahSiswa.hobby : murid.hobby;

                res.json({ pesan: "berhasil di ubah", siswa });
            }
        })
    } else {
        res.status(400).json({ 'pesan': `Siswa dengan id ${req.params.id} tidak ditemukan` })
    }
})

// delete data
router.delete('/:id', (req, res) => {
    const ditemukan = siswa.some(murid => murid.id === parseInt(req.params.id));
    if (ditemukan) {
        res.json({
            pesan: "siswa terhapus",
            siswa: siswa.filter(murid => murid.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ 'pesan': `Siswa dengan id ${req.params.id} tidak ditemukan` })
    }
})


module.exports = router;