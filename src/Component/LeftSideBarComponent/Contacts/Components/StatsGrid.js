import React from 'react';
import {View} from 'react-native';
import StatCard from './StatCard';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';

const StatsGrid = ({
  totalJobs,
  lifeTimeValue,
  latestInvoice,
  avgDaysToPay,
  avgEfficiency,
  referral,
  googleReview,
  avgEnjoymentScale,
}) => (
  <View style={ContactCardStyle.statsGrid}>
    <StatCard label="Jobs Completed" value={totalJobs || '-'} />
    <StatCard label="Lifetime Value" value={lifeTimeValue ? `$${lifeTimeValue}` : '-'} />
    <StatCard
      label="Last Invoice"
      value={
        latestInvoice?.DateString
          ? new Date(latestInvoice.DateString)?.toLocaleDateString()
          : '-'
      }
    />
    <StatCard label="Avg. Days to Pay" value={avgDaysToPay || '-'} />
    <StatCard label="Job Efficiency" value={avgEfficiency || '-'} />
    <StatCard label="Referrals" value={referral || '-'} />
    <StatCard label="Google Review" value={googleReview || '-'} />
    <StatCard label="Enjoyment Scale" value={avgEnjoymentScale || '-'} />
  </View>
);

export default StatsGrid;
