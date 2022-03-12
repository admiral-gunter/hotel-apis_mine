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
    INSERT INTO pemesanan_kamar (kamar_id, created_at, created_by, nama_user, no_telp, email, pricing ) VALUES ?
    `
    let dataQuery = [
        data.kamar_id,
        data.created_at,
        req.user.id,
        data.nama_user,
        data.no_telp,
        data.email,
        null
    ]
    DBConnection.beginTransaction()
    DBConnection.query(`SELECT * FROM kamar WHERE id = ?`, dataQuery[0],(err, result)=>{
        if (err) throw err
        if (result[0].status == 1){
            res.status(400).send({
                "status" : 0,
                "message": "kamar sudah terbook"
            })
            return
        }
        DBConnection.query(query, [[dataQuery]], (err, result)=>{
            if (err) throw err
            let query =
            `
            SELECT * FROM pemesanan_kamar WHERE id = ${result.insertId}
            `
            DBConnection.query(query, (err, result)=>{
                if (err) throw err
                let id = result[0].kamar_id
                let query = `UPDATE kamar SET status = 1 WHERE id = ${id}`
                DBConnection.query(query, (err, result)=>{
                    DBConnection.commit()
                    res.status(201).send({
                        "status" : 1,
                        "result": result
                    })
                })
            })
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
        data.kamar_id,
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

    DBConnection.beginTransaction()
    DBConnection.query(`SELECT * FROM pemesanan_kamar WHERE id = ?`, id, (err,result)=>{
        if (err) throw err
        DBConnection.query(`UPDATE kamar SET status = 0 WHERE id = ?`, result[0].kamar_id,(err, result)=>{
           if(err) throw err
           let query = 
           `
           DELETE FROM pemesanan_kamar WHERE id = ?
           `
           DBConnection.query(query, [id], (err, result)=>{
                if (err) throw err
                DBConnection.commit()
                res.status(201).send({
                    "status": 1,
                    "result": result
                })
            })
        })
    })
}