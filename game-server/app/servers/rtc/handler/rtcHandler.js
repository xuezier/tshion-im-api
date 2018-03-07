'use strict';
const _ = require('../../../../libs/util');

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
  this.channelService = app.get('channelService');
};

var prototype = Handler.prototype;

/**
 * 调起语音拨打
 * @param {{}} msg
 * @param {*} session
 * @param {Function} next
 */
prototype.audioDial = function(msg, session, next) {
  let self = this;
  let [uid] = session.uid.split('*');

  let param = {
    route: 'audio.dial',
    from: uid
  };

  self.app.rpc.chat.chatRemote.channelPushMessageByUid(session, param, msg.target, function(err) {
    if (err) return next({ code: 400, error: err });

    next(null, { code: 200 });
  });
};

/**
 * 接收语音拨打
 * @param {*} msg
 * @param {*} session
 * @param {*} next
 */
prototype.audioDialAcess = function(msg, session, next) {
  let self = this;
  let [uid] = session.uid.split('*');

  let param = {
    route: 'audio.dial.access',
    from: uid
  };

  self.app.rpc.chat.chatRemote.channelPushMessageByUid(session, param, msg.target, function(err) {
    if (err) return next({ code: 400, error: err });

    next(null, { code: 200 });
  });
};


prototype.audioDialReject = function(msg, session, next) {
  let self = this;
  let [uid] = session.uid.split('*');

  let param = {
    route: 'audio.dial.reject',
    from: uid
  };

  self.app.rpc.chat.chatRemote.channelPushMessageByUid(session, param, msg.target, function(err) {
    if (err) return next({ code: 400, error: err });

    next(null, { code: 200 });
  });
};