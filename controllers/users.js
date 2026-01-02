const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password, role } = req.body;
        const newUser = new User({username, email, role});
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};

module.exports.showWishList = async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.render("users/wishlist.ejs", { wishlist: user.wishlist });
};

module.exports.addToWishlist = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    user.wishlist.push(id);
    await user.save();
    // req.flash("success", "Listing added wishlist!");
    res.redirect(`/listings/${id}`);
};

module.exports.removeFromWishList = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter((listingId) => listingId.toString() !== id);
    await user.save();
    const redirectUrl = req.headers.referer || "/wishlist";
    res.redirect(redirectUrl);
};


// console.log(req.path, "..", req.originalUrl)