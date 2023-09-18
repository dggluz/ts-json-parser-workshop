import * as jestUtils from 'jest-util';
import { getSnapshotStatus } from './helpers';
import { StdIo } from './StdIo.js';
import {inspect} from 'util';
const _jestMessageUtil = require('jest-message-util')
import { AggregatedResult, Config, Reporter, Test, TestResult } from '@jest/reporters';

type ReporterOptions = {
  showPaths?: boolean;
  showWarnings?: boolean;
  useDots?: boolean;
};

export default class SilentReporter implements Pick<Reporter, 'onRunStart' | 'onRunComplete' | 'onTestResult'> {
  _globalConfig: Config.GlobalConfig;
  stdio: StdIo;
  useDots: boolean;
  showPaths: boolean;
  showWarnings: boolean;
  hasErrored: boolean;

  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions = {}) {
    this._globalConfig = globalConfig;
    this.stdio = new StdIo();
    this.useDots = !!process.env.JEST_SILENT_REPORTER_DOTS || !!options.useDots;
    this.useDots = false; // MIA
    this.showPaths =
      !!process.env.JEST_SILENT_REPORTER_SHOW_PATHS || !!options.showPaths;
    this.showWarnings =
      !!process.env.JEST_SILENT_REPORTER_SHOW_WARNINGS ||
      !!options.showWarnings;
    this.hasErrored = false;
  }

  onRunStart() {
    if (jestUtils.isInteractive) {
      jestUtils.clearLine(process.stderr);
    }
  }

  onRunComplete(
    test?: Set<unknown>,
    runResults?: AggregatedResult
  ) {
    const firstFailedTest = runResults
      ?.testResults
      .sort((aTestResult, anotherTestResult) => aTestResult.testFilePath < anotherTestResult.testFilePath ? -1 : 1)
      .flatMap(({ testResults }) => testResults)
      .find(tr => tr.status !== 'passed');

    if (firstFailedTest) {
      console.log(_jestMessageUtil.formatResultsErrors(
        [firstFailedTest], {
          rootDir: '',
          testMatch: []
        }, {
          noStackTrace: false,
        },
      ));
    }
    if (this.useDots) {
      this.stdio.log('\n');
    }
    this.stdio.close();
  }

  onTestResult(test: Test, testResult: TestResult) {
    return;
    console.log(test.path);
    if (this.hasErrored) {
      return;
    }
    if (this.useDots) {
      this.stdio.logInline('.');
    }

    if (!testResult.skipped) {
      const didUpdate = this._globalConfig.updateSnapshot === 'all';
      let hasSnapshotFailures = false;
      if (testResult.snapshot) {
        if (!didUpdate && testResult.snapshot.unchecked) {
          hasSnapshotFailures = true;
        }
        if (testResult.snapshot.unmatched) {
          hasSnapshotFailures = true;
        }
      }

      const hasFailures = testResult.failureMessage || hasSnapshotFailures;

      this.hasErrored = this.hasErrored || !!hasFailures;

      if (this.showPaths && hasFailures) {
        this.stdio.log('\n' + test.path);
      }
      if (testResult.failureMessage) {
        const failedTest = testResult.testResults.find(tr => tr.status === 'failed')
        // this.stdio.log('failedTest ' + inspect(failedTest));
        // this.stdio.log('  ● ' + failedTest.ancestorTitles.concat(failedTest.title).join(' › '))

        console.log(_jestMessageUtil.formatResultsErrors(testResult.testResults.slice(0, 1), {
          rootDir: '',
          testMatch: []
        }, {
          noStackTrace: false,
        }));
        // this.stdio.log(testResult.failureMessage);
        // this.stdio.log(inspect(testResult.testResults));
      }
      if (testResult.console && this.showWarnings) {
        // testResult.console
        //   .filter(entry => ['error', 'warn'].includes(entry.type) && entry.message)
        //   .slice(0, 1)
        //   .map(entry => entry.message)
        //   .forEach(this.stdio.log);
      }
      const snapshotStatuses = getSnapshotStatus(
        testResult.snapshot,
        didUpdate
      );
      snapshotStatuses.forEach(this.stdio.log);
    }
  }
}
