const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const { isDbConnected } = require('../config/db');

// In-memory fallback repository when Atlas is not yet configured with valid credentials
let inMemoryGuests = [
  {
    _id: 'mock_1',
    name: 'శ్రీనివాస రావు & కుటుంబం (Srinivasa Rao & Family)',
    phone: '+91 98480 12345',
    email: 'srinivas.rao@example.com',
    side: 'Groom (వరుడి వైపు)',
    attendance: 'Attending All Events (అన్ని కార్యక్రమాలు)',
    guestCount: 4,
    dietaryPreference: 'Traditional Andhra Bhojanam (ఆంధ్రా శాకాహార భోజనం)',
    wishes: 'నూరేళ్ళ పంట మీ కల్యాణ వేడుక! ఇరువురి జీవితాలు సుఖసంతోషాలతో, ఆయురారోగ్యాలతో నిండాలని కోరుకుంటున్నాము! 🌸🙏',
    isConfirmed: true,
    createdAt: new Date(Date.now() - 3600000 * 24),
  },
  {
    _id: 'mock_2',
    name: 'రాఘవేంద్ర & సుమలత (Raghavendra & Sumalatha)',
    phone: '+91 94401 56789',
    email: 'raghav.sum@example.com',
    side: 'Bride (వధువు వైపు)',
    attendance: 'Attending All Events (అన్ని కార్యక్రమాలు)',
    guestCount: 3,
    dietaryPreference: 'Traditional Andhra Bhojanam (ఆంధ్రా శాకాహార భోజనం)',
    wishes: 'సీతారాముల వంటి అనురాగం, లక్ష్మీనారాయణుల వంటి ఐశ్వర్యం మీ సొంతం కావాలని మనసారా ఆశీర్వదిస్తున్నాం! ✨💐',
    isConfirmed: true,
    createdAt: new Date(Date.now() - 3600000 * 12),
  },
  {
    _id: 'mock_3',
    name: 'అనిల్ కుమార్ (Anil Kumar & Friends)',
    phone: '+91 91234 56780',
    email: 'anilkumar@example.com',
    side: 'Common Friend / Well-Wisher (ఇరువైపులా / ఆత్మీయులు)',
    attendance: 'Reception Only (విందు మాత్రమే)',
    guestCount: 2,
    dietaryPreference: 'Special Feast / General (ప్రత్యేక విందు)',
    wishes: 'Heartiest congratulations to the lovely couple! May your journey ahead be filled with infinite laughter and love! 🥂🎉',
    isConfirmed: true,
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
];

// @route   GET /api/guests
// @desc    Get all RSVP guests
router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const guests = await Guest.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: guests.length, data: guests, source: 'database' });
    }
    return res.json({ success: true, count: inMemoryGuests.length, data: inMemoryGuests, source: 'in-memory' });
  } catch (error) {
    console.error('Error fetching guests:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving guests', error: error.message });
  }
});

// @route   POST /api/guests
// @desc    Create new RSVP & blessing
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, side, attendance, guestCount, dietaryPreference, wishes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone Number are required / పేరు మరియు ఫోన్ నంబర్ తప్పనిసరి.',
      });
    }

    const guestPayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      side: side || 'Common Friend / Well-Wisher (ఇరువైపులా / ఆత్మీయులు)',
      attendance: attendance || 'Attending All Events (అన్ని కార్యక్రమాలు)',
      guestCount: Number(guestCount) || 1,
      dietaryPreference: dietaryPreference || 'Traditional Andhra Bhojanam (ఆంధ్రా శాకాహార భోజనం)',
      wishes: wishes && wishes.trim() !== '' 
        ? wishes.trim() 
        : 'సదా మీ దాంపత్యం కలకాలం సుఖసంతోషాలతో వర్ధిల్లాలని మనస్ఫూర్తిగా కోరుకుంటున్నాము! ✨ (Wishing you a blissful married life!)',
      isConfirmed: true,
    };

    if (isDbConnected()) {
      const newGuest = await Guest.create(guestPayload);
      return res.status(201).json({
        success: true,
        message: 'ధన్యవాదాలు! మీ హాజరు విజయవంతంగా నమోదైనది (RSVP submitted successfully)!',
        data: newGuest,
        source: 'database',
      });
    } else {
      const newGuest = {
        _id: 'guest_' + Date.now(),
        ...guestPayload,
        createdAt: new Date(),
      };
      inMemoryGuests.unshift(newGuest);
      return res.status(201).json({
        success: true,
        message: 'ధన్యవాదాలు! మీ హాజరు విజయవంతంగా నమోదైనది (RSVP recorded in session)!',
        data: newGuest,
        source: 'in-memory',
      });
    }
  } catch (error) {
    console.error('Error saving RSVP:', error);
    res.status(500).json({ success: false, message: 'Failed to record RSVP', error: error.message });
  }
});

// @route   GET /api/guests/stats
// @desc    Get dashboard metrics & count summaries
router.get('/stats', async (req, res) => {
  try {
    let guestsList = [];
    if (isDbConnected()) {
      guestsList = await Guest.find();
    } else {
      guestsList = inMemoryGuests;
    }

    const totalRsvps = guestsList.length;
    const totalAttendees = guestsList.reduce((acc, g) => {
      if (g.attendance !== 'Regretfully Cannot Attend (రాలేకపోతున్నాం)') {
        return acc + (g.guestCount || 1);
      }
      return acc;
    }, 0);

    const groomSide = guestsList.filter((g) => g.side.includes('Groom')).length;
    const brideSide = guestsList.filter((g) => g.side.includes('Bride')).length;
    const commonSide = guestsList.filter((g) => g.side.includes('Common')).length;

    const allEvents = guestsList.filter((g) => g.attendance.includes('All Events')).length;
    const muhurthamOnly = guestsList.filter((g) => g.attendance.includes('Muhurtham Only')).length;
    const receptionOnly = guestsList.filter((g) => g.attendance.includes('Reception Only')).length;
    const declined = guestsList.filter((g) => g.attendance.includes('Regretfully')).length;

    res.json({
      success: true,
      stats: {
        totalRsvps,
        totalAttendees,
        groomSide,
        brideSide,
        commonSide,
        attendanceBreakdown: {
          allEvents,
          muhurthamOnly,
          receptionOnly,
          declined,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate stats', error: error.message });
  }
});

// @route   DELETE /api/guests/:id
// @desc    Delete RSVP entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      await Guest.findByIdAndDelete(id);
    } else {
      inMemoryGuests = inMemoryGuests.filter((g) => g._id !== id);
    }
    res.json({ success: true, message: 'RSVP removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting RSVP', error: error.message });
  }
});

module.exports = router;
