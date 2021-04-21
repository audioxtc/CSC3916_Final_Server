import {RoundUp} from '../models/rounding.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res) => {
    req.body.order.user = req.profile
    const roundup = new RoundUp(req.body.roundup)
    roundup.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json(result)
    })
}

const listByCharity = (req, res) => { //return array of charities from mongodb displays to user
    RoundUp.find({"//charities": req.charity._id})
        .populate({path: 'products.product', select: '_id name price'})
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(orders)
        })
}

/* Not sure how to implement this
const getStatusValues = (req, res) => {
    res.json(CartItem.schema.path('status').enumValues)
}

 */

const roundUpByID = (req, res, next, id) => {
    RoundUp.findById(id).populate('products.product', 'name price').populate('products.shop', 'name').exec((err, order) => {
        if (err || !order)
            return res.status('400').json({
                error: "Order not found"
            })
        req.roundup = order
        next()
    })
}

const listByUser = (req, res) => {
    RoundUp.find({ "user": req.profile._id })
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(orders)
        })
}

const read = (req, res) => {
    return res.json(req.roundup)
}

export default {
    create,
    listByShop,
    update,
    getStatusValues,
    orderByID,
    listByUser,
    read
}
