const jsonwebtoken = require("jsonwebtoken")
const secret = "chris"
const JWT = {
    generate(value,expires){
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }
        catch(e){
            return false
        }
    }
}
const token = JWT.generate({name:"chris"},"10s")
console.log(JWT.verify(token))
module.exports = JWT;