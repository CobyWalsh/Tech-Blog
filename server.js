const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.use(session({
  secret: 'rootroot',
  resave: false,
  saveUninitialized: true,
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
// Define a route for logging out
app.get('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      // Redirect the user to the homepage after logout
      res.redirect('/');
    }
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
  console.log(JSON.stringify(availableRoutes(), null, 2));
});

function availableRoutes() {
  return app._router.stack
    .filter(r => r.route)
    .map(r => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: r.route.path
      };
    });
}
