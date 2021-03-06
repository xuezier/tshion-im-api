'use strict';
module.exports = {
  content: { type: 'string' },
  from: { type: 'string' },
  target: { type: 'string' },
  roomid: { type: 'string' },
  route: { type: 'string' },
  group: { type: 'string' },
  timestamp: { type: 'string|number', default: () => { return +new Date; } },
  type: { type: 'string', default: 'text' }, // text, audio, image, file
  filename: { type: 'string' },
  audio: { type: 'string' },
  file: { type: 'string' },
  image: { type: 'string' },
  duration: { type: 'string|number' },
  image: { type: 'string' },
  __route__: { type: 'string' }
};
