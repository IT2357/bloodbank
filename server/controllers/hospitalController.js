// server/controllers/hospitalController.js

import HealthRecord from '../models/HealthRecord.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodInventory from '../models/BloodInventory.js';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import checkEligibility from '../utils/eligibilityChecker.js';
// import sendNotification from '../utils/sendNotification.js'; // Uncomment if you enable this module

export const addHealthRecord = async (req, res) => {
  try {
    const { donorId, weight, height, systolicBP, diastolicBP, hemoglobin } = req.body;
    const recordedBy = req.user.id;

    const record = new HealthRecord({
      donorId,
      weight,
      height,
      systolicBP,
      diastolicBP,
      hemoglobin,
      recordedBy,
    });
    await record.save();

    const eligible = await checkEligibility(donorId);
    if (eligible.status === 'eligible') {
      // await sendNotification(donorId, 'You are now eligible to donate blood again!');
    }

    res.status(201).json({ message: 'Health record saved', record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHealthRecords = async (req, res) => {
  try {
    const { donorId } = req.params;
    const records = await HealthRecord.find({ donorId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEligibleDonors = async (req, res) => {
  try {
    const donors = await User.find({ role: 'donor' });

    const eligibleDonors = [];

    for (const donor of donors) {
      const isEligible = await checkEligibility(donor._id);
      if (isEligible.status === 'eligible') {
        eligibleDonors.push({
          id: donor._id,
          name: donor.name,
          bloodGroup: donor.bloodGroup,
          gender: donor.gender,
          email: donor.email,
          lastEligibleDate: isEligible.nextEligibleDate,
        });
      }
    }

    res.json(eligibleDonors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBloodRequest = async (req, res) => {
  try {
    const { responderHospitalId, bloodGroup, units, purpose, isUrgent } = req.body;
    const request = new BloodRequest({
      requesterHospitalId: req.user.id,
      responderHospitalId,
      bloodGroup,
      units,
      purpose,
      isUrgent,
    });
    await request.save();
    res.status(201).json({ message: 'Request created', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const respondBloodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const request = await BloodRequest.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();
    res.json({ message: `Request ${status}`, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
