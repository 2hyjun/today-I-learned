import mongoose, { Document, Model } from 'mongoose';

export interface AutoDispatchLogs {
  auto_dispatch: boolean;
  timestamp: number;
}

export interface DriverAutoDispatchLogs {
  driver_id: number;
  timezone: number;
  auto_dispatch_logs: AutoDispatchLogs[];
  updated_at: Date;
}

export interface DriverAutoDispatchLogsDocument extends DriverAutoDispatchLogs, Document {}

export interface DriverAutoDispatchLogsModel extends Model<DriverAutoDispatchLogsDocument> {
  insertLogs: (driver_id: number, timezone: number, autoDispatch: boolean) => Promise<void>;
}

const DriverAutoDispatchLogsSchema = new mongoose.Schema(
  {
    driver_id: { type: Number, required: true, unique: true },
    auto_dispatch_logs: { type: Array, required: true, default: [] },
    timezone: { type: Number, required: false, default: 0 },
  },
  {
    usePushEach: true,
    collection: 'driver_auto_dispatch_logs',
    timestamps: {
      updatedAt: 'updated_at',
      createdAt: false,
    },
  }
);

DriverAutoDispatchLogsSchema.statics.insertLogs = async (
  driver_id: number,
  timezone: number,
  auto_dispatch: boolean
) => {
  const prevData = await DriverAutoDispatchLogs.findOne({ driver_id });
  if (!prevData) {
    await DriverAutoDispatchLogs.findOneAndUpdate(
      { driver_id },
      {
        $push: {
          auto_dispatch_logs: {
            auto_dispatch,
            timestamp: new Date().getTime(),
          },
        },
        timezone,
      },
      { upsert: true }
    );
  } else {
    const prevLogs = prevData.auto_dispatch_logs;
    const lastData = prevLogs[prevLogs.length - 1];

    if (lastData.auto_dispatch !== auto_dispatch) {
      // 이전 데이터와 다를 경우에만 insert
      await DriverAutoDispatchLogs.findOneAndUpdate(
        { driver_id },
        {
          $push: {
            auto_dispatch_logs: {
              auto_dispatch,
              timestamp: new Date().getTime(),
            },
          },
          timezone,
        },
        { upsert: true }
      );
    }
  }
};

const DriverAutoDispatchLogs = mongoose.model<DriverAutoDispatchLogsDocument, DriverAutoDispatchLogsModel>(
  'DriverAutoDispatchLog',
  DriverAutoDispatchLogsSchema
);

export default DriverAutoDispatchLogs;
