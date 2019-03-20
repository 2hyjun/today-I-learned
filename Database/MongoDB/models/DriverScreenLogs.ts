import Bluebird from 'bluebird';
import _ from 'lodash';
import moment from 'moment';
import mongoose, { Document, Model } from 'mongoose';

export interface ScreenLogs {
  on_time: number;
  screen: string;
  updated_timestamp: number;
}

export interface DriverScreenLogs {
  driver_id: number;
  screen_logs: ScreenLogs[];
  updated_at: Date;
}

export interface DriverScreenLogsDocument extends DriverScreenLogs, Document {
  findPreviousDayData: (timezone: number) => ScreenLogs[];
}

export interface DriverScreenLogsModel extends Model<DriverScreenLogsDocument> {
  insertLogs: (driver_id: number, time: number, screen: string) => Promise<any>;
  findByDriverId: (driver_id: number) => Promise<any>;
  extractLogs: (timezone: number) => Promise<any>;
}

const DriverScreenLogsSchema = new mongoose.Schema(
  {
    driver_id: { type: Number, required: true, unique: true },
    screen_logs: Array,
  },
  {
    timestamps: {
      updatedAt: 'updated_at', // auto add createAt, updatedAt
      createdAt: false,
    },
  }
);

DriverScreenLogsSchema.statics.findByDriverId = (driver_id: number) => {
  return DriverScreenLogs.findOne({ driver_id });
};

DriverScreenLogsSchema.statics.insertLogs = async (driver_id: number, on_time: number, screen: string) => {
  const driver = await DriverScreenLogs.findOne({ driver_id });
  const prevLogs = driver ? driver.screen_logs : [];
  prevLogs.push({ on_time, screen, updated_timestamp: new Date().getTime() });
  await DriverScreenLogs.findOneAndUpdate({ driver_id }, { screen_logs: prevLogs }, { upsert: true });
};

DriverScreenLogsSchema.statics.extractLogs = async (timezone: number) => {
  // Function For STATS SCRIPT

  // 드라이버의 time존에 맞게 데이터 꺼내기
  // const fromTime = moment()
  //   .utcOffset(timezone * 60) // 해당 국가 기준
  //   .subtract(1, 'day') // 어제 00시 부터
  //   .startOf('day') // 어제 00시 부터
  //   .utc();
  // const toTime = moment() // 해당 국가 기준
  //   .utcOffset(timezone * 60) // 오늘 00시 까지
  //   .startOf('day') // 오늘 00시 까지
  //   .utc();

  const fromTime = moment('2019-03-19T15:00:00.000Z');
  const toTime = moment('2019-03-19T16:00:00.000Z');

  const updatedDrivers = await DriverScreenLogs.find();
  console.log('updatedDrivers ids', _.map(updatedDrivers, 'driver_id'));

  const hasEmptyLogDrivers: number[] = [];

  const extractedLogs = await Bluebird.map(updatedDrivers, async uD => {
    const [yesterdayLog, restLog] = _.partition(
      // 쿼리 범위 내에 있는 로그 / 아닌 로그 분리
      uD.screen_logs,
      (log: ScreenLogs) => log.updated_timestamp >= fromTime.valueOf() && log.updated_timestamp < toTime.valueOf()
    );

    if (restLog.length === 0) {
      // 현지 시간 기준 어제 로그 모두 export하고 남은 로그가 없는 드라이버
      // 이 드라이버 들은 map loop 끝나면 한꺼번에 DELETE
      hasEmptyLogDrivers.push(uD.driver_id);
    } else {
      // 남은 로그 있는 드라이버 들은 남은 로그만 저장
      await DriverScreenLogs.updateOne({ driver_id: uD.driver_id }, { screen_logs: restLog });
    }

    if (yesterdayLog.length === 0) {
      // 현지 시간 기준 어제 0시 ~ 오늘 0시에 화면을 켜지 않았지만,
      // 오늘 0시 이후 ~ 스크립트 실행 전에 화면을 켠 드라이버
      return;
    }

    return { driver_id: uD.driver_id, screen_logs: yesterdayLog };
  });

  await DriverScreenLogs.deleteMany({
    driver_id: {
      $in: hasEmptyLogDrivers,
    },
  });

  return extractedLogs.filter(log => log !== undefined);
};

const DriverScreenLogs = mongoose.model<DriverScreenLogsDocument, DriverScreenLogsModel>(
  'DriverLocation',
  DriverScreenLogsSchema
);

export default DriverScreenLogs;
