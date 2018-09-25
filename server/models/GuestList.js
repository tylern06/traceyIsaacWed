var mongoose = require("mongoose");

//create GuestList schema

/**
[{
  Tyler: {
    rsvp: true,
    food: N/A
  }
}]
**/
var GuestListSchema = new mongoose.Schema(
  {
    _id: String,
    party: Array,
    guestCount: Number
  },
  {
    timestamps: true
  }
);

// GuestListSchema.path("name").required(true, "Name cannot be blank");

var GuestList = mongoose.model("GuestList", GuestListSchema);
