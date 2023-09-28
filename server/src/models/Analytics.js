import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
}) 

const Analytics = mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;