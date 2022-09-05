/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hathorLib from '@hathor/wallet-lib';

/**
 * This file contains all variables a user has to modify if he wants to create
 * an app for his own token. Files should never import them directly (they are
 * prepended with '_'). Instead, constants.js imports and re-exports them.
 */

/**
 * Indicates if app should handle multiple tokens or just one. If it handles just one,
 * some modifications are made to the app:
 * . initial screen is not the dashboard with tokens list, but the default token main screen;
 * . remove register/unregister token options;
 * . remove create new token option;
 */
export const _IS_MULTI_TOKEN = false;

/**
 * Default token.
 *
 * Example config:
 * {
 *   name: 'YanCoin',
 *   symbol: 'YAN',
 *   uid: '0000089ac2800ed9f1297d1569b7089bd26107d9c9d6a05d6dbe14890e793c41'
 * }
 */
//export const _DEFAULT_TOKEN = hathorLib.constants.HATHOR_TOKEN_CONFIG;
export const _DEFAULT_TOKEN = {
      name: 'Profito Token',
      symbol: 'PRF',
      uid: '0000089ac2800ed9f1297d1569b7089bd26107d9c9d6a05d6dbe14890e793c41'
    };

/**
 * App's primary color (Profito Orange)
 */
export const _PRIMARY_COLOR = '#fda800';

/**
 * App's color (Profito Orange): '#fda800' 
 * App's color (Profito Yellow): '#fada15' 
 * App's color (Profito Black): '#202020'
 * App's color (Profito Grey): '#cdc4d1'
 * /

/**
 * Sentry DSN to send errors
 */
export const _SENTRY_DSN = '';
