/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express     = require('express'),
  app           = express(),
  config        = require('./config/config'),
  credentials   = require('./credentials'),
  mongoose      = require('mongoose').connect(credentials.database.url),
  bluemix       = require('./config/bluemix'),
  models        = require('./models/models'),
  TwitterHelper = require('./helpers/twitter-helper'),
  twitter       = new TwitterHelper(credentials.twitter),
  data          = require('./helpers/data')(twitter),
  logger        = require('./config/logger'),
  controllers   = require('./controllers/controllers'),
  services      = require('./config/services');

config(app);
controllers(app);

logger.info('Initializing application\'s data');
data.init();

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
