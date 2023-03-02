import ormconfig from '@app/ormconfig';
import { SeedDB1677590778395 } from './seeds/1677590778395-SeedDB';
const seedConfig = {
  ...ormconfig,
  migrations: [SeedDB1677590778395],
};

export default seedConfig;
