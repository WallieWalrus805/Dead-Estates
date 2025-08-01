const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let postRoutes = express.Router()

// #1 - Retrieve All
// http://localhost:3000/posts
postRoutes.route("/posts").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("listings").find({}).toArray()
    if (data.length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

// #2 - Retrieve One
// http://localhost:3000/posts/12345
postRoutes.route("/posts/:id").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("listings").findOne({ _id: new ObjectId(request.params.id) })
    if (Object.keys(data).length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

// #3 - Create one
postRoutes.route("/posts").post(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.body.author,
        dateCreated: request.body.dateCreated
    }
    let data = await db.collection("listings").insertOne(mongoObject)
    response.json(data)
})

// #4 - Update one
postRoutes.route("/posts/:id").put(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: request.body.dateCreated
        }
    }
    let data = await db.collection("listings").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

// #5 - Delete One
postRoutes.route("/ah/:id").delete(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("listings").deleteOne({ _id: new ObjectId(request.params.id)})
    response.json(data)
})

module.exports = postRoutes