import RegisterModel from "../register/register.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import vm from "v-response";

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    RegisterModel.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "Hoops cant find a user with the provided email address please check "))
            }
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(400)
                            .json(vm.ApiResponse(false, 400, "incorrect password please check and try again "))
                    }
                    if (isMatch) {
                        const payload = {id: user.id};
                        jwt.sign(payload, "keys", {expiresIn: "365d"}, (error, token) => {
                            return res.status(200)
                                .json(vm.ApiResponse(true, 200, "login successful", {
                                    user: user,
                                    toke: "Bearer " + token
                                }));

                        });

                    }
                })
        })

};
