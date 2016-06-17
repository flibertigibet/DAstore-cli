#!/usr/bin/env babel-node --optional es7.asyncFunctions
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var getBabelRelayPlugin = require('babel-relay-plugin');
var fs = require('fs');
var path = require('path');
var request = require('sync-request');
var introspectionQuery = require('graphql/utilities').introspectionQuery;

import {SERVER_URL} from '../src/helpers/constants';

const GRAPH_SERVER_URL = `${SERVER_URL}/graphql`;
console.log("Fetching GraphQL Schema");
const response = request('GET', GRAPH_SERVER_URL, {
  qs: {
    query: introspectionQuery
  }
});

const schema = JSON.parse(response.body.toString('utf-8'));

fs.writeFileSync(
  path.join(__dirname, '../data/schema.json'),
  JSON.stringify(schema, null, 2)
);
console.log("DONE Fetching GraphQL Schema");

module.exports = getBabelRelayPlugin(schema.data);
