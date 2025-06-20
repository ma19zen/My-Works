import 'ts-node/register';

export default {
  spec_dir: 'tests',
  spec_files: [
    '**/*[sS]pec.ts'
  ],
  helpers: [],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,
    forbidDuplicateNames: true
  }
};
