/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import moment from 'moment';
import { t } from 'ttag';

export class TxHistory {
  constructor({ txId, timestamp, tokenUid, balance, isVoided }) {
    this.txId = txId;
    this.timestamp = timestamp;
    this.tokenUid = tokenUid;
    this.balance = balance;
    this.isVoided = isVoided;
  }

  getDescription(token) {
    let { symbol } = token;
    if (this.tokenUid !== token.uid) {
      // This should never happen!
      symbol = t`Unknown`;
    }
    if (this.balance > 0) {
      return t`Recebido ${symbol}`;
    } if (this.balance < 0) {
      return t`Enviado ${symbol}`;
    }
    return t`You sent ${symbol} to yourself`;
  }

  getTimestampFormat() {
    return moment.unix(this.timestamp).format('DD MMM YYYY [•] HH:mm');
  }

  getTimestampCalendar() {
    // See https://momentjs.com/docs/#/displaying/calendar-time/
    return moment.unix(this.timestamp).calendar(null, {
      sameDay: `[Hoje •] HH:mm`,
      nextDay: `[Amanhã •] HH:mm`,
      nextWeek: `dddd [•] HH:mm`,
      lastDay: `[Ontem •] HH:mm`,
      lastWeek: `[Última] dddd [•] HH:mm`,
      sameElse: `DD MMM YYYY [•] HH:mm`,
    });
  }
}
