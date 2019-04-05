import _ from 'lodash';
import mongoose, { Document, Model } from 'mongoose';

export interface OnlineLogs {
  online: boolean;
  timestamp: number;
}

export interface DriverOnlineLogs {
  driver_id: number;
  timezone: number;
  online_logs: OnlineLogs[];
  updated_at: Date;
}

export interface DriverOnlineLogsDocument extends DriverOnlineLogs, Document {}

export interface DriverOnlineLogsModel extends Model<DriverOnlineLogsDocument> {
  insertLogs: (driver_id: number, timezone: number, online: boolean) => Promise<void>;
}

const DriverOnlineLogsSchema = new mongoose.Schema(
  {
    driver_id: { type: Number, required: true, unique: true },
    online_logs: { type: Array, required: true, default: [] },
    timezone: { type: Number, required: false, default: 0 },
  },
  {
    usePushEach: true,
    collection: 'driver_online_logs',
    timestamps: {
      updatedAt: 'updated_at',
      createdAt: false,
    },
  }
);

DriverOnlineLogsSchema.statics.insertLogs = async (driver_id: number, timezone: number, online: boolean) => {
  const prevDocument = await DriverOnlineLogs.findOne({ driver_id });
  const prevOnlineLogs = _.get(prevDocument, 'online_logs', []);
  const lastLog = _.get(_.last(prevOnlineLogs), 'online', undefined);

  if (lastLog !== online) {
    // 이전 데이터가 없거나, 이전 데이터와 다를 경우에만 insert
    await DriverOnlineLogs.findOneAndUpdate(
      { driver_id },
      {
        $push: {
          online_logs: {
            online,
            timestamp: new Date().getTime(),
          },
        },
        timezone,
      },
      { upsert: true }
    );
  }
};

const DriverOnlineLogs = mongoose.model<DriverOnlineLogsDocument, DriverOnlineLogsModel>(
  'DriverOnlineLog',
  DriverOnlineLogsSchema
);

export default DriverOnlineLogs;
