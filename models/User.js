require('dotenv').config()
const db = require('../data/db')

const Role = {
    Admin: 0,
    Test: 1,
    User: 2,
    Vip: 3
}

const User = db.Schema({
    _id: {type: Number, required: true},
    TELEGRAM_USER_NAME: {type: String, required: true},
    TELEGRAM_USER_IMAGE: {type: String, required: false},
    ChannelId: {type: Number, required: false},
    Role: { type: Number, enum: Object.values(Role), required: true },
    Points: {type: Number, index: true, required: true},
    Streak: {type: Number, required: true},
    Posts_per_current_day: {type: Number, required: true},
    BestStreak: {type: Number, required: true},
    NumberOfPostsPerCurrentWeek: {type: Number, required: true},
    CurrentLevel: {type: Number, required: true},
    WeeklyStreak: {type: Number, required: true},
    PositionInGlobalRatingSameLevel: {type: Number, required: false},
    PositionInGlobalRating: {type: Number, required: false},
    CurrentBooster: {type: Number, required: true},
    RecentPostLink: {type: String, required: false},
    ReferralNumber: {type: Number, required: true},
    ReferralLink: {type: String, required: true},
    NumberOfReferredPeopleTotal: {type: Number, required: true},
    LastPostNumber: {type: Number, requiered: true},
    Posts: {type: Array, required: false}
})

module.exports = db.model('User', User)