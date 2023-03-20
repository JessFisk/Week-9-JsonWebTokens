require("dotenv").config()
const express = require("express")
const cors = require("cors");

const port = process.env.PORT || 5001;

const User = require("./users/model");
const Book = require("./Books/model");
const Genre = require("./Genre/model")
const Author = require("./Authors/model")
const Favourite = require("./Favourites/model")

const userRouter = require("./users/routes");
const bookRouter = require("./Books/routes");
const genreRouter = require("./Genre/routes");
const authorRouter = require("./Authors/routes");
const favouriteRouter = require("./Favourites/routes");

const app = express();

app.use(cors());
app.use(express.json());

const syncTables = () => {
    Author.hasMany(Book);
    Genre.hasMany(Book);
    Favourite.hasMany(Book);
    Favourite.hasMany(User);
    Book.belongsTo(Author);
    Book.belongsTo(Genre);
    Book.belongsTo(Favourite);
    User.belongsTo (Favourite);

    User.sync();
    // User.sync({ alter: true, force: false });
    Book.sync();
    Genre.sync();
    Author.sync();
    Favourite.sync();
}

app.use(userRouter);
app.use(bookRouter);
app.use(genreRouter);
app.use(authorRouter);
app.use(favouriteRouter);

app.get("/health", (req, res) =>
    res.status(200).json({ message: "API is working" }));

app.listen(port, () => {
    syncTables();
    console.log(`server is listening on port ${port}`);
})