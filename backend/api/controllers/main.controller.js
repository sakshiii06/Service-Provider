var providers = require("../models/providers.models");
const Provider = require("../db/db");
const { ObjectId } = require("mongodb");

// UTIL Functions

// Check if list is empty
function isEmptyList(obj) {
    return (!obj || obj.length == 0 || Object.keys(obj).length == 0);
}


// // Handle error
function handleError(res, error) {
    res.status(200);
    res.send("Something went wrong. \n" + error);
  }

// //Check for existing provider
// function existsProvider(id) {
//     return providers.find(provider => provider.id == id);
// }

// //Generate a unique provider id
// function getUniqueId(providers) {
//     let min = 100000;
//     let max = 999999;
//     do {
//         let id = Math.floor(Math.random() * (max - min) + min);
//     } while (existsProvider(id));

//     return id;
// }

// CRUD - Create (POST), Read (GET), Update (PUT), Delete (DELETE)

// POST
// URI: /api/providers
module.exports.create = function (req, res) {
    //Create a random ID
    try {
        // if (isEmptyList(providers)) {
        //     providers = [];
        // }

        // var id = req.body.id;
        // if (existsProvider(id)) {
        //     res.status(400);
        //     res.send('duplicate id not allowed');
        //     id = getUniqueId(); //get new ID
        // }

        var provider = req.body; //get new provider
        // provider.id = id;


        // //Add new provider to list
        // providers.push(provider)
        Provider.create(provider)
            .then(result => {
                res.status(401);
                res.send(result);
            })
            .catch(error => handleError(res, error))


    }
    catch (error) {
        handleError(res, error)
    }

};

// GET
// URI: /api/providers
module.exports.readAll = function (req, res) {
    try {
        Provider.find()
            .then(result => {
                if (isEmptyList(result)) {
                    res.status(400);
                    res.send('List is empty.')
                }
                res.status(200);
                res.send(result);
            })

            .catch(error => handleError(res, error))
    }
    catch (error) {
        handleError(res, error)
    }
}


// GET
// URI: /api/providers/123
module.exports.readOne = function (req, res) {
    try {
        let id = req.params.id;
        Provider.find({ '_id': id })
            .then(result => {
                if (isEmptyList(result)) {
                    res.status(400);
                    res.send('List is empty, Nothing to read')
                }

                // let provider = providers.find(provider => provider.id == id);
                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res, error))
    }
    catch (error) {
        handleError(res, error)
    }

};

// PUT
// URI: /api/providers/123
module.exports.update = function (req, res) {
    try {
        let id = req.params.id;
        let provider = req.body;
        Provider.findOneAndUpdate({ '_id': id }, provider, { new: true })
            .then(result => {
                if (isEmptyList(result)) {
                    res.status(404);
                    res.send('List is empty. Cannot update')
                }

                // let provider = providers.find(provider => provider.id == id)
                // provider.firstname = req.body.firstname;
                // provider.lastname = req.body.lastname;
                // provider.position = req.body.position;
                // provider.company.company_name = req.body.company.company_name;
                // provider.company.address = req.body.company.address;
                // provider.company.address2 = req.body.company.address2;
                // provider.company.city = req.body.company.city;
                // provider.company.state = req.body.company.state;
                // provider.company.postal_code = req.body.company.postal_code;
                // provider.company.description = req.body.company.description;
                // provider.company.tagline = req.body.company.tagline;

                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res, error))

    }
    catch (error) {
        handleError(res, error)
    }
}


// DELETE
// URI: /api/providers/123
module.exports.deleteOne = function (req, res) {
    try {
        let id = req.params.id;
        Provider.findOneAndDelete({ '_id': id })
            .then(result => {
                if (isEmptyList(result)) {
                    res.status(404);
                    res.send('List is empty. Cannot delete')
                }
                // let provider = providers.find((provider) => provider.id == id);
                // let index = providers.indexOf(provider);
                // providers.splice(index, 1);

                res.status(200);  //res.status(404)
                res.send(result);
            })
            .catch(error => handleError(res, error))

    }
    catch (error) {
        handleError(res, error)
    }

};

// DELETE
// URI: /api/providers
module.exports.deleteAll = function (req, res) {
    try {
        Provider.deleteMany({})
            .then(result => {
                if (isEmptyList(result)) {
                    res.status(404);
                    res.send('List is empty. Cannot delete');
                }
                // providers = [];
                res.status(200);
                res.send('All providers Deleted.');
            })
            .catch((error) => handleError(res, error));
    }
    catch (error) {
        handleError(res, error);
    }

};