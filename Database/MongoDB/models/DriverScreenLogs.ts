import mongoose, { Document, Model } from 'mongoose';

export interface ScreenLogs {
  on_time: number;
  screen: string;
  timestamp: number;
}

export interface DriverScreenLogs {
  driver_id: number;
  screen_logs: ScreenLogs[];
  updated_at: Date;
  timezone: number;
}

export interface DriverScreenLogsDocument extends DriverScreenLogs, Document {}

export interface ExtractedDriverScreenLogs {
  driver_id: DriverScreenLogs['driver_id'];
  screen_logs: DriverScreenLogs['screen_logs'];
  timezone: DriverScreenLogs['timezone'];
}

export interface DriverScreenLogsModel extends Model<DriverScreenLogsDocument> {
  insertLogs: (
    driver_id: number,
    on_time: number,
    screen: string,
    timezone: number,
    timestamp: number
  ) => Promise<void>;
  findByDriverId: (driver_id: number) => Promise<DriverScreenLogsDocument>;
  extractLogs: (timezone: number) => Promise<ExtractedDriverScreenLogs>;
}

const DriverScreenLogsSchema = new mongoose.Schema(
  {
    driver_id: { type: Number, required: true, unique: true },
    screen_logs: { type: Array, required: true, default: [] },
    timezone: { type: Number, required: false, default: 0 },
  },
  {
    usePushEach: true,
    collection: 'driver_screen_logs',
    timestamps: {
      updatedAt: 'updated_at', // auto add createAt, updatedAt
      createdAt: false,
    },
  }
);

DriverScreenLogsSchema.statics.findByDriverId = (driver_id: number) => {
  return DriverScreenLogs.findOne({ driver_id });
};

DriverScreenLogsSchema.statics.insertLogs = async (
  driver_id: number,
  on_time: number,
  screen: string,
  timezone: number,
  timestamp: number
) => {
  await DriverScreenLogs.findOneAndUpdate(
    { driver_id },
    {
      $push: {
        screen_logs: {
          on_time,
          screen,
          timestamp,
        },
      },
      timezone,
    },
    {
      upsert: true,
    }
  );
};

const DriverScreenLogs = mongoose.model<DriverScreenLogsDocument, DriverScreenLogsModel>(
  'DriverScreenLog',
  DriverScreenLogsSchema
);

export default DriverScreenLogs;
