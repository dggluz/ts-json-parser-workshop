import * as chalk from 'chalk';
import { TestResult } from '@jest/reporters'

const ARROW = ' \u203A ';
const FAIL_COLOR = chalk.bold.red;
const SNAPSHOT_ADDED = chalk.bold.green;
const SNAPSHOT_REMOVED = chalk.bold.red;
const SNAPSHOT_UPDATED = chalk.bold.green;

const pluralize = (word: string, count: number) => `${count} ${word}${count === 1 ? '' : 's'}`;

export const getSnapshotStatus = (snapshot: TestResult['snapshot'], afterUpdate: boolean) => {

  const statuses = [];

  if (snapshot.added) {
    statuses.push(
      SNAPSHOT_ADDED(ARROW + pluralize('snapshot', snapshot.added)) +
        ' written.'
    );
  }

  if (snapshot.updated) {
    statuses.push(
      SNAPSHOT_UPDATED(ARROW + pluralize('snapshot', snapshot.updated)) +
        ` updated.`
    );
  }

  if (snapshot.unchecked) {
    statuses.push(
      FAIL_COLOR(ARROW + pluralize('obsolete snapshot', snapshot.unchecked)) +
        (afterUpdate ? ' removed' : ' found') +
        '.'
    );
  }

  if (snapshot.fileDeleted) {
    statuses.push(
      SNAPSHOT_REMOVED(ARROW + 'Obsolete snapshot file') + ` removed.`
    );
  }

  if (snapshot.unmatched) {
    statuses.push(
      FAIL_COLOR(ARROW + pluralize('snapshot test', snapshot.unmatched)) +
        ' failed.'
    );
  }
  return statuses;
};
