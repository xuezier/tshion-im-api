'use strict';

module.exports = function(app) {
  const Group = require('../../../models/group')(app);
  const Setting = require('../../../models/group/setting')(app);
  const Member = require('../../../models/group/member')(app);

  return {
    get: {
      'member/:member_id': {
        docs: {
          name: '获取成员信息',
          params: [
            { param: 'member_id', type: 'String' }
          ]
        },
        method(req, res, next) {
          let { member_id } = req.params;

          Member.getMemberInfo(member_id).then(info => {
            res.json(info);
          }).catch(next);
        }
      }
    },
    post: {
      '': {
        docs: {
          name: '创建群组',
          params: [
            { key: 'members', type: 'Array' },
            { key: 'creator', type: 'String' },
            { key: 'name', type: 'String' }
          ]
        },
        method(req, res, next) {
          let { members } = req.body;

          new Group(req.body).save().then(newGroup => {
            var group = newGroup._id;

            return Promise.all([
              new Setting({ group }).save(),
              Member.addMany(members, group)
            ]).then(() => {
              res.json(newGroup);
            });
          }).catch(next);
        }
      }
    },
    put: {
      'member/add/:group': {
        docs: {
          name: '群组添加成员',
          params: [
            { param: 'group', type: 'String' },
            { key: 'members', type: 'Array' },
          ]
        },
        method(req, res, next) {
          let { members } = req.body;
          let { group } = req.params;

          if (members instanceof String) members = [members];

          Member.addMany(members, group).then(result => {
            res.json(result);
          }).catch(next);
        }
      }
    },
    delete: {
      'member/:group': {
        docs: {
          name: '删除群组成员',
          params: [
            { param: 'group', type: 'String' },
            { key: 'members', type: 'Array' }
          ]
        },
        method(req, res, next) {
          let { members } = req.body;
          let { group } = req.params;

          if (members instanceof String) members = [members];

          Member.deleteMembers(members).then(result => {
            res.json(result);
          }).catch(next);
        }
      }
    }
  };
};
