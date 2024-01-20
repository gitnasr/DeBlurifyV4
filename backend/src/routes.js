const Routes = {
    users: require('./services/users/routes'),
    upload: require('./services/upload/router'),
    enhance: require('./services/enhance/router'),
    admin: require('./services/admin/router'),

}

module.exports = (app) => {
    app.use('/users', Routes.users);
    app.use('/upload', Routes.upload);
    app.use('/enhance', Routes.enhance);
    app.use('/admin', Routes.admin);
}
