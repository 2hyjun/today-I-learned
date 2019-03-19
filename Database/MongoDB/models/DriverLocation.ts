import mongoose, { Document, Model } from 'mongoose';
import moment from 'moment';

export interface ScreenLogs {
  time: number;
  screen: string;
  reportedAt: number;
}

export interface ScreenLogsDocument extends ScreenLogs, Document {
  value: () => void;
}

export interface ScreenLogsModel extends Model<ScreenLogsDocument> {
  createLogs: (driver_id: number, time: number, screen: string) => Promise<any>;
  findByDriverId: (driver_id: number) => Promise<any>;
}

const ScreenLogSchema = new mongoose.Schema({
  time: Number,
  screen: String,
  createdAt: String,
});

const DriverLocationSchema = new mongoose.Schema(
  {
    driver_id: { type: Number, required: true, unique: true },
    screen_logs: [ScreenLogSchema],
  },
  {
    timestamps: true, // auto add createAt, updatedAt
  }
);

DriverLocationSchema.statics.findByDriverId = function(driver_id: number) {
  return DriverLocation.findOne({ driver_id });
};

DriverLocationSchema.statics.createLogs = async function(driver_id: number, time: number, screen: string) {
  return DriverLocation.findOneAndUpdate(
    { driver_id },
    {
      $push: {
        screen_logs: {
          screen,
          time,
          createdAt: moment()
            .utc()
            .format('YYYY-MM-DD hh:mm:ss'),
        },
      },
    },
    { new: true, upsert: true }
  );
};

export const DriverLocation = mongoose.model<ScreenLogsDocument, ScreenLogsModel>(
  'DriverLocation',
  DriverLocationSchema
);
