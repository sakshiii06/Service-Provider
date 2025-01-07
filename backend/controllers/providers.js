const providers = require('../models/providers')
//main controller

module.exports.list = function (req, res) {
    res.render('providers/providers-list', { providers: providers });
}

module.exports.details = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-details', { id: id, title: 'Service Providers Details', company: provider.company });
}

module.exports.edit = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-edit', { id: id, title: 'Edit', provider: provider });
}
module.exports.update = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id)
    provider.firstname = req.body.firstname;
    provider.lastname = req.body.lastname;
    provider.position = req.body.position;
    provider.company.email = req.body.email;
    provider.company.phone = req.body.phone;
    provider.company.company_name = req.body.company_name;
    provider.company.address = req.body.address;
    provider.company.address2 = req.body.address2;
    provider.company.city = req.body.city;
    provider.company.state = req.body.state;
    provider.company.postal_code = req.body.postal_code;
    provider.company.description = req.body.description;
    provider.company.tagline = req.body.tagline;
    res.render('providers/providers-update', { title: 'update', });
}


module.exports.addForm = function (req, res) {
    res.render('providers/providers-add-form', { title: 'Add-Form' });
}
module.exports.add = function (req, res) {
    let min = 100000;
    let max = 999999;
    let id = Math.floor(Math.random() * (max - min) + min)
    let provider = {
        id: id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position: req.body.position,
        company: {
            company_name: req.body.company_name,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.postal_code,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            tagline: req.body.tagline,
        }

    }
    providers.push(provider)

    res.render('providers/providers-add', { title: 'Add', });
}
// Delete a Provider
module.exports.delete = function (req, res) {
    let id = req.params.id;
    let provider = providers.find((provider) => provider.id == id);
    let company = provider.company.company_name;
    let index = providers.indexOf(provider);
    providers.splice(index, 1);
  
    res.render("providers/providers-delete", {
      title: "Deleted Service Provider",
      company: company,
    });
  };