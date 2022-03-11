import DBConnection from "../../db/connection.js"

export const getBookingRoom = (req,res)=>{
    let query = 
    `
    SELECT * FROM pemesanan_kamar
    `
    DBConnection.query(query,  (err, result)=>{
        if (err) throw err
        res.status(200).send({
            "status" : 1,
            "result": result
        })
    })
}

export const createBookingRoom = (req,res) => {
    const data = req.body
    let query = 
    `
    INSERT INTO pemesanan_kamar (kamar_id, created_at, created_by) VALUES ?
    `
    let dataQuery = [
        data.name,
        data.created_at,
        null,
        data.nama_user,
        data.no_telp,
        data.email
    ]

    DBConnection.query(query, [dataQuery], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status" : 1,
            "result": result
        })
    })
}

export const updateBookingRoom = (req,res)=>{
    const data = req.body
    let query = 
    `
    UPDATE pemesanan_kamar SET (kamar_id, created_at, created_by) VALUES ?
    WHERE id = ${req.params.id}
    `
    let dataQuery = [
        data.name,
        data.created_at,
        null,
        data.nama_user,
        data.no_telp,
        data.email
    ]

    DBConnection.query(query, [dataQuery], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status" : 1,
            "result": result
        })
    })
}

export const deleteBookingRoom = (req,res)=>{
    const id = req.params.id
    let query = 
    `
    DELETE FROM pemesanan_kamar WHERE id = ?
    `
    DBConnection.query(query, [id], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status": 1,
            "result": result
        })
    })
}