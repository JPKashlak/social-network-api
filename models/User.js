const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: `^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
        },
        thoughts: [ThoughtSchema],
        friends: [UserSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema)

module.exports = User;