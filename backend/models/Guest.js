const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter guest name / అతిథి పేరు రాయండి'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please enter phone number / ఫోన్ నంబర్ రాయండి'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    side: {
      type: String,
      enum: [
        'Groom (వరుడి వైపు)',
        'Bride (వధువు వైపు)',
        'Common Friend / Well-Wisher (ఇరువైపులా / ఆత్మీయులు)',
      ],
      default: 'Common Friend / Well-Wisher (ఇరువైపులా / ఆత్మీయులు)',
    },
    attendance: {
      type: String,
      enum: [
        'Attending All Events (అన్ని కార్యక్రమాలు)',
        'Muhurtham Only (ముహూర్తం మాత్రమే)',
        'Reception Only (విందు మాత్రమే)',
        'Regretfully Cannot Attend (రాలేకపోతున్నాం)',
      ],
      default: 'Attending All Events (అన్ని కార్యక్రమాలు)',
    },
    guestCount: {
      type: Number,
      default: 1,
      min: [1, 'Guest count must be at least 1'],
      max: [20, 'Guest count max is 20'],
    },
    dietaryPreference: {
      type: String,
      enum: [
        'Traditional Andhra Bhojanam (ఆంధ్రా శాకాహార భోజనం)',
        'Special Feast / General (ప్రత్యేక విందు)',
      ],
      default: 'Traditional Andhra Bhojanam (ఆంధ్రా శాకాహార భోజనం)',
    },
    wishes: {
      type: String,
      trim: true,
      default: 'సదా మీ దాంపత్యం కలకాలం సుఖసంతోషాలతో వర్ధిల్లాలని మనస్ఫూర్తిగా కోరుకుంటున్నాము! ✨ (Wishing you a blissful married life!)',
    },
    isConfirmed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Guest || mongoose.model('Guest', GuestSchema);
