// server/utils/eligibilityChecker.js

const checkEligibility = (healthRecord, lastDonationDate, gender) => {
  if (
    !healthRecord ||
    !healthRecord.weight ||
    !healthRecord.systolicBP ||
    !healthRecord.diastolicBP
  ) {
    return {
      eligible: false,
      reason: "Incomplete health record"
    };
  }

  if (healthRecord.weight < 50) {
    return {
      eligible: false,
      reason: "Weight must be at least 50 kg"
    };
  }

  const { systolicBP, diastolicBP } = healthRecord;
  if (
    systolicBP < 120 || systolicBP > 180 ||
    diastolicBP < 80 || diastolicBP > 100
  ) {
    return {
      eligible: false,
      reason: "Blood pressure out of acceptable range"
    };
  }

  if (lastDonationDate) {
    const now = new Date();
    const lastDate = new Date(lastDonationDate);
    const diffInDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    const requiredGap = gender?.toLowerCase() === "female" ? 120 : 90;
    if (diffInDays < requiredGap) {
      return {
        eligible: false,
        reason: `Must wait ${requiredGap - diffInDays} more day(s) before donating again`
      };
    }
  }

  return {
    eligible: true,
    reason: "Eligible to donate"
  };
};

export default checkEligibility;
