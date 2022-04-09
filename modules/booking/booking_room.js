import DBConnection from "../../db/connection.js"
import util from 'util'
import { discountSpecial, normalPrice } from "../../functions/discountGenerator.js"

export const getBookingRoom = (req,res)=>{
    let query = 
    `
    SELECT pk.*,k.name AS kamar,jk.name AS jenis_kamar , jk.harga_kamar AS room_pricing, u.full_name AS created_who FROM pemesanan_kamar AS pk
    LEFT JOIN kamar AS k 
    ON pk.kamar_id  = k.id
    LEFT JOIN jenis_kamar AS jk
    ON k.jenis_kamar  = jk.id 
    LEFT JOIN users AS u
    ON pk.created_by  = u.id 
    `
    DBConnection.query(query,  (err, result)=>{
        if (err) throw err
        res.status(200).send({
            "status" : 1,
            "result": result
        })
    })
}

export const getBookingRoomById = (req,res)=>{
    const id = req.params.id
    let diskon
    let query = 
    `
    SELECT pk.*, k.jenis_kamar AS jenis_kamar , k.name AS nama_kamar, k.max_kapasitas AS capacity, k.status  AS status_kamar FROM pemesanan_kamar pk
    LEFT JOIN kamar AS k 
    ON pk.kamar_id  = k.id
    WHERE pk.id = ?
    `
    DBConnection.query(query,  id,(err, resultan)=>{
        if (err) throw err
        DBConnection.query(`SELECT * FROM jenis_kamar WHERE id = ?`, resultan[0].jenis_kamar,(err, result)=>{
            console.log(resultan);
            console.log(result);
            diskon = resultan[0].pricing/result[0].harga_kamar * 100
            if (err) throw err
            res.status(200).send({
                "status" : 1,
                "data": resultan,
                "result": result,
                "diskon": diskon
            })
        })  
    })
}

export const createBookingRoom = async (req,res) => {
    const data = req.body
    DBConnection.beginTransaction()
    let query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes
    let queryApr 
    let id
    let pricing
    try {
        let dataQuery = [
            data.kamar_id,
            data.created_at,
            req.user.id,
            data.nama_user,
            data.no_telp,
            data.email
        ]
       
        queryApr = await query(`SELECT * FROM kamar WHERE id = ?`, dataQuery[0])
        if(queryApr[0].status == 1){
            res.status(400).send({
                "status" : 0,
                "message": "kamar sudah terbook"
            })
            return
        }
        pricing = await normalPrice(queryApr[0].jenis_kamar)
        var today = new Date();
        if(today.getDay() == 6 || today.getDay() == 0)
        {
            pricing = await discountSpecial(queryApr[0].jenis_kamar)
        }
        // if(user || weekend lesgo diskon){
        //     pricing = await discountSpecial(queryApr[0].jenis_kamar)
        // }
        dataQuery.push(pricing)
        queryRes = await query(`INSERT INTO pemesanan_kamar (kamar_id, created_at, created_by, nama_user, no_telp, email, pricing ) 
                                VALUES ?`, [[dataQuery]])
        queryApr = await query(`SELECT * FROM pemesanan_kamar WHERE id = ${queryRes.insertId}`)
        id = queryApr[0].kamar_id

        queryRes = await query(`UPDATE kamar SET status = 1 WHERE id = ${id}`)

        queryRes = await query(`INSERT INTO log_pemesanan_kamar (kamar_id, created_at, created_by, nama_user, no_telp, email, pricing ) VALUES ?`, [[dataQuery]]) 
       
        DBConnection.commit()
        res.status(201).send({
            "status" : 1,
            "result": queryRes
        })
    } catch (err) {
        console.log(err);
        DBConnection.rollback()
        return res.status(500).send({
            status:0,
            message:err
        })
    }
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
        req.user.id,
        data.nama_user,
        data.no_telp,
        data.email
    ]

    DBConnection.query(query, [[dataQuery]], (err, result)=>{
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